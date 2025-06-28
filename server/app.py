from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Tour, Booking, Review
from config import Config
from dotenv import load_dotenv
from flask_migrate import Migrate 

load_dotenv()

app = Flask(
    __name__,
    static_folder='../client/dist',
    static_url_path='',
    template_folder='../client/dist'
)


app.config.from_object(Config)
print("Using DB:", app.config["SQLALCHEMY_DATABASE_URI"])


db.init_app(app)
migrate = Migrate(app, db)

CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)

@app.route('/')
def index():
    return render_template('index.html')

# Register a new user
@app.route("/api/users", methods=["POST"])
def register_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = generate_password_hash(password, method="pbkdf2:sha256")
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }), 200
@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()
    phone_number = data.get("phone_number")
    date = data.get("date")
    user_id = data.get("user_id")
    tour_id = data.get("tour_id")


    if not phone_number or not date or not user_id or not tour_id:
        return jsonify({"error": "Missing required fields"}), 400

 
    tour = Tour.query.get(tour_id)
    if not tour:
        return jsonify({"error": f"Tour with ID {tour_id} not found"}), 404


    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404

   
    booking = Booking(
        date=date,
        phone_number=phone_number,
        user_id=user_id,
        tour_id=tour_id
    )
    db.session.add(booking)
    db.session.commit()

    return jsonify({
        "id": booking.id,
        "message": "Booking created successfully"
    }), 201



@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([
        {
            "id": b.id,
            "date": b.date,
            "user_id": b.user_id,
            "tour_id": b.tour_id
        } for b in bookings
    ])

@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):
    data = request.get_json()
    booking = Booking.query.get_or_404(booking_id)
    booking.date = data.get("date", booking.date)
    db.session.commit()
    return jsonify({"message": "Booking updated"})

@app.route("/api/bookings/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"message": "Booking deleted"})


@app.route("/api/reviews", methods=["POST"])
def create_review():
    data = request.get_json()
    comment = data.get("comment")
    rating = data.get("rating")
    user_id = data.get("user_id")
    tour_id = data.get("tour_id")

    if not comment or not rating or not user_id or not tour_id:
        return jsonify({"error": "Missing review fields"}), 400

    if not Tour.query.get(tour_id):
        return jsonify({"error": f"Tour ID {tour_id} does not exist"}), 404

    review = Review(comment=comment, rating=rating, user_id=user_id, tour_id=tour_id)
    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review submitted successfully"}), 201



@app.route("/api/tours/<int:tour_id>/reviews", methods=["GET"])
def get_tour_reviews(tour_id):
    try:
        reviews = Review.query.filter_by(tour_id=tour_id).all()
        response = []
        for r in reviews:
            response.append({
                "id": r.id,
                "comment": r.comment,
                "rating": r.rating,
                "user_id": r.user_id,
                "user_name": r.user.name if r.user else "Anonymous"
            })
        return jsonify(response), 200
    except Exception as e:
        print(f"Error fetching reviews for tour {tour_id}:", e)
        return jsonify({"error": "Failed to fetch reviews"}), 500

