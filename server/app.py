from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Tour, Booking, Review
from config import Config
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)  
db.init_app(app)
CORS(app)



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
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })


@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()

    date = data.get("date")
    user_id = data.get("user_id")
    tour_id = data.get("tour_id")

    if not date or not user_id or not tour_id:
        return jsonify({"error": "Missing booking fields"}), 400

    user = User.query.get(user_id)
    tour = Tour.query.get(tour_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    if not tour:
        return jsonify({"error": "Tour not found"}), 404

    booking = Booking(date=date, user_id=user_id, tour_id=tour_id)
    db.session.add(booking)
    db.session.commit()

    return jsonify({"message": "Booking submitted successfully!"}), 201



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


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)