from app import app
from models import db, User, Tour, Booking, Review

with app.app_context():


 
    Review.query.delete()
    Booking.query.delete()
    User.query.delete()
    Tour.query.delete()

 
    u1 = User(name="Ali", email="ali@example.com", password="hashed_password")
    u2 = User(name="Sara", email="sara@example.com", password="hashed_password")

    t1 = Tour(name="Safari Adventure", description="Exciting wildlife tour")
    t2 = Tour(name="Desert Trek", description="Explore the desert landscapes")

    db.session.add_all([u1, u2, t1, t2])
    db.session.commit()

    b1 = Booking(date="2025-07-01", phone_number="0712345678", user_id=u1.id, tour_id=t1.id)
    b2 = Booking(date="2025-07-10", phone_number="0712345679", user_id=u2.id, tour_id=t2.id)

    db.session.add_all([b1, b2])
    db.session.commit()

    r1 = Review(user_id=u1.id, tour_id=t1.id, rating=5, comment="Amazing tour!")
    r2 = Review(user_id=u2.id, tour_id=t2.id, rating=4, comment="Great experience.")

    db.session.add_all([r1, r2])
    db.session.commit()

    print("Database seeded!")
