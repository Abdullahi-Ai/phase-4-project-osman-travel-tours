import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Osman Travel Tours</strong>. Learn more about our mission and our story here.
      </p>

      <section className="about-gallery">
        <h2>Our Journey in Pictures</h2>
        <div className="about-images">
          <img src="/assets/Amboseli.jpeg" alt="Safari experience" />
          <img src="/assets/Nairobi.jpeg" alt="Tour Group" />
          <img src="/assets/serengeti.jpeg" alt="Wildlife" />
        </div>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To deliver life-changing safari adventures and authentic travel experiences that connect people with Africa’s breathtaking landscapes and vibrant cultures.
        </p>
      </section>

      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          Founded with a passion for travel and a love for nature, Osman Travel Tours has been guiding adventurers through Kenya and beyond for years. We aim to offer personalized, unforgettable safari moments to every traveler.
        </p>
      </section>

      <section className="about-adventures">
        <h2>Our Adventures</h2>
        <p>
          Besides safaris, we also take people on hiking trips to explore Kenya’s scenic terrains, rolling hills, and hidden trails. Whether you're climbing mountains or wandering through forested paths, every experience is crafted to reconnect you with nature.
        </p>
        <div className="adventure-images">
          <img src="/assets/hiking1.jpeg" alt="Hiking adventure 1" />
          <img src="/assets/hiking2.jpg" alt="Hiking adventure 2" />
          <img src="/assets/hiking 3.jpeg" alt="Hiking adventure 3" />
        </div>
      </section>
    </div>
  );
}