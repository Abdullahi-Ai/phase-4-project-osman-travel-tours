from app import app
from models import db, User, Tour, Booking, Review

with app.app_context():
    Review.query.delete()
    Booking.query.delete()
    User.query.delete()
    Tour.query.delete()

    # Seed users
    u1 = User(name="Ali", email="ali@example.com", password="hashed_password")
    u2 = User(name="Sara", email="sara@example.com", password="hashed_password")
    db.session.add_all([u1, u2])
    db.session.commit()

 
    tours_data = [
        (1, "Amboseli National Park", "See stunning views of Mount Kilimanjaro and large elephant herds."),
        (2, "Zanzibar Beach Getaway", "Relax on white sandy beaches and explore Stone Town’s history."),
        (3, "Serengeti Adventures", "Witness the Great Migration and Africa’s Big Five."),
        (4, "Nairobi National Game Park", "Safari in the world’s only urban national park."),
        (5, "Lake Nakuru National Park", "Famous for flamingos, rhinos, and scenic lakeshores."),
        (6, "Mombasa Coastal Adventure", "Enjoy the vibrant Swahili culture and Indian Ocean beaches."),
    ]

    tours = []
    for id_, name, desc in tours_data:
        tours.append(Tour(id=id_, name=name, description=desc))
    db.session.add_all(tours)
    db.session.commit()

   
    b1 = Booking(date="2025-07-01", phone_number="0712345678", user_id=u1.id, tour_id=1)
    b2 = Booking(date="2025-07-10", phone_number="0712345679", user_id=u2.id, tour_id=2)
    db.session.add_all([b1, b2])
    db.session.commit()

 
    r1 = Review(user_id=u1.id, tour_id=1, rating=5, comment="Amazing tour!")
    r2 = Review(user_id=u2.id, tour_id=2, rating=4, comment="Great experience.")
    db.session.add_all([r1, r2])
    db.session.commit()

    print("Database seeded with tours, users, bookings, and reviews!")
