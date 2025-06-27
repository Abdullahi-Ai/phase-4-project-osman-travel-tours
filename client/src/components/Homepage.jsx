import React, { useState, useEffect } from "react";
import TOURS from "./TOURS";
import TourDetails from "./TourDetails";
import BookingForm from "./BookingForm";

export default function Homepage() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", message: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((idx) => (idx + 1) % TOURS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowBooking(false);
      setSelectedTour(null);
      setBookingData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="homepage-flex">
      <main className="homepage-main" style={{ width: "100%" }}>
  
        <section className="hero-section" style={{ position: "relative" }}>
          {TOURS.map((tour, idx) => (
            <div
              key={tour.key}
              className="hero-bg"
              style={{
                backgroundImage: `url('${tour.image}')`,
                opacity: idx === bgIndex ? 1 : 0,
                zIndex: idx === bgIndex ? 1 : 0,
              }}
              aria-label={tour.name}
            ></div>
          ))}
          <div className="hero-content">
            <h1>Welcome to Osman Travel Tours</h1>
            <p>
              Discover unforgettable adventures across Kenya and East Africa with us. Your journey starts here!
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>About Osman Travel Tours</h2>
          <p>
            At Osman Safari Tours, our work is to turn your dream safaris into a remarkable reality.
            <br />
            <strong>Your safaris. Our passion.</strong> With extensive experience and a dedicated team, we craft unforgettable wilderness experiences for travelers from around the world.
          </p>
          <ol className="about-list">
            <li>
              <h3>Our Mission</h3>
              <p>
                To deliver life-changing safari adventures and authentic travel experiences that connect people with
                Africa’s breathtaking landscapes, vibrant wildlife, and rich cultures—while ensuring sustainability and
                respect for nature and local communities.
              </p>
            </li>
            <li>
              <h3>Our Vision</h3>
              <p>
                To be the leading safari tour operator in Africa, inspiring explorers worldwide by setting the standard
                for personalized service, exceptional journeys, and responsible travel.
              </p>
            </li>
          </ol>
        </section>

      
        <section className="tours-section">
          <h2>Popular Tours</h2>
          <div className="tour-cards">
            {TOURS.map((tour) => (
              <div className="tour-card" key={tour.key}>
                <img src={tour.image} alt={tour.name} />
                <h3>{tour.name}</h3>
                <p>{tour.short}</p>
                <div className="tour-payment">
                  <p>
                    <b>Kenya Citizen:</b> {tour.payment.citizen}
                  </p>
                  <p>
                    <b>Non-citizen:</b> {tour.payment.nonCitizen}
                  </p>
                </div>
                <button
                  className="learn-more-btn"
                  onClick={() => {
                    setSelectedTour(tour);
                    setShowBooking(false);
                  }}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        {selectedTour && !showBooking && (
          <TourDetails
            tour={selectedTour}
            onClose={() => setSelectedTour(null)}
            onBookNow={() => setShowBooking(true)}
          />
        )}

     
        {selectedTour && showBooking && (
          <BookingForm
            selectedTour={selectedTour}
            bookingData={bookingData}
            onChange={handleBookingChange}
            onSubmit={handleBookingSubmit}
            bookingSuccess={bookingSuccess}
            onClose={() => {
              setShowBooking(false);
              setBookingSuccess(false);
            }}
          />
        )}
      </main>
    </div>
  );
}
