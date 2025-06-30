
from flask import Flask, request, jsonify, render_template, session
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
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    return render_template('index.html')



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

    hashed_password = generate_password_hash(password)
    user = User(name=name, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([
        {"id": u.id, "name": u.name, "email": u.email} for u in users
    ])


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

    session['user_id'] = user.id

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_admin": user.is_admin
    })


@app.route("/me")
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_admin": user.is_admin
    })


@app.route("/api/tours", methods=["GET"])
def get_all_tours():
    tours = Tour.query.all()
    return jsonify([
        {
            "id": t.id,
            "name": t.name,
            "description": t.description,
            "price": t.price
        } for t in tours
    ])

@app.route("/api/tours", methods=["POST"])
def create_tour():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")

    if not name or not description or not price:
        return jsonify({"error": "Missing required fields"}), 400

    tour = Tour(name=name, description=description, price=price)
    db.session.add(tour)
    db.session.commit()

    return jsonify({
        "id": tour.id,
        "message": "Tour created successfully"
    }), 201

@app.route("/api/tours/<int:tour_id>", methods=["PATCH"])
def update_tour(tour_id):
    tour = Tour.query.get_or_404(tour_id)
    data = request.get_json()

    tour.name = data.get("name", tour.name)
    tour.description = data.get("description", tour.description)
    tour.price = data.get("price", tour.price)

    db.session.commit()
    return jsonify({
        "id": tour.id,
        "name": tour.name,
        "description": tour.description,
        "price": tour.price,
        "message": "Tour updated successfully"
    }), 200

@app.route("/api/tours/<int:tour_id>", methods=["DELETE"])
def delete_tour(tour_id):
    tour = Tour.query.get_or_404(tour_id)
    db.session.delete(tour)
    db.session.commit()
    return jsonify({"message": f"Tour {tour_id} deleted"}), 200



@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()
    phone_number = data.get("phone_number")
    date = data.get("date")
    user_id = data.get("user_id")
    tour_id = data.get("tour_id")

    if not all([phone_number, date, user_id, tour_id]):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.get(user_id)
    tour = Tour.query.get(tour_id)

    if not user:
        return jsonify({"error": f"User with ID {user_id} not found"}), 404
    if not tour:
        return jsonify({"error": f"Tour with ID {tour_id} not found"}), 404

    existing = Booking.query.filter_by(user_id=user_id, tour_id=tour_id, date=date).first()
    if existing:
        return jsonify({"error": "You already booked this tour on that date."}), 409

    booking = Booking(phone_number=phone_number, date=date, user_id=user_id, tour_id=tour_id)
    db.session.add(booking)
    db.session.commit()

    return jsonify({
        "id": booking.id,
        "message": "Booking created",
        "user_name": user.name,
        "tour_name": tour.name
    }), 201


@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([
        {
            "id": b.id,
            "date": b.date,
            "phone_number": b.phone_number,
            "user_id": b.user_id,
            "user_name": b.user.name if b.user else "N/A",
            "user_email": b.user.email if b.user else "N/A",
            "tour_id": b.tour_id,
            "tour_name": b.tour.name if b.tour else "N/A"
        } for b in bookings
    ])


@app.route("/api/bookings/<int:booking_id>", methods=["PUT"])
def update_booking(booking_id):
    data = request.get_json()
    booking = Booking.query.get_or_404(booking_id)

    booking.date = data.get("date", booking.date)
    booking.phone_number = data.get("phone_number", booking.phone_number)
    booking.tour_id = data.get("tour_id", booking.tour_id)
    booking.user_id = data.get("user_id", booking.user_id)

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
        return jsonify([
            {
                "id": r.id,
                "comment": r.comment,
                "rating": r.rating,
                "user_id": r.user_id,
                "user_name": r.user.name if r.user else "Anonymous"
            } for r in reviews
        ]), 200
    except Exception as e:
        print(f"Error fetching reviews: {e}")
        return jsonify({"error": "Failed to fetch reviews"}), 500
