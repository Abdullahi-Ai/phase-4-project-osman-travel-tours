# React + Vite

# Osman Travel Tours
A full-stack web application for booking safari tours, built with a **Flask** API  backend and a **React** as frontend.

## Features

- User registration and login
- Browse and book safari tours
- Leave reviews for tours
- Admin dashboard to manage bookings
- Responsive and modern design
- Form validation with Formik and Yup


## Tech Stack

- **Frontend**: React, React Router, Formik, Yup
- **Backend**: Flask, SQLAlchemy, SQLite

- **Other**: Fetch API, Formspree


## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
flask run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Database Models

- **User**: id, name, email, password, is_admin
- **Tour**: id, name, description
- **Booking**: id, date, user_id, tour_id
- **Review**: id, user_id, tour_id, rating, comment

### Relationships

- **User → Bookings (one-to-many)**
- **Tour → Bookings (one-to-many)**
- **User ↔ Tour (many-to-many via Review, with rating/comment as user-submitted attributes)**

## Client-side Routing

- `/` — Home (Homepage)
- `/about` — About Us
- `/blog` — Blog
- `/safari-packages` — List of safari packages
- `/contact` — Contact form
- `/signin` — User/Admin login
- `/admin` — Admin dashboard



## Usage

1. **Register** and log in as a user or admin.
2. **Browse** available tours and packages.
3. **Book** a tour using the booking form (must be logged in).
4. **Leave reviews** for tours (must be logged in).
5. **Admins** can log in to the admin dashboard to manage bookings and review action history.

---


## License

MIT
Author 
ibrahim Abdullahi 
---

## Acknowledgements

- Built with Flask, React, SQLAlchemy, and open source tools.