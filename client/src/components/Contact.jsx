// This is contacts.jsx 
import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! You can reach us via:</p>

      <ul className="contact-list">
        <li>
          <a
            href="https://wa.me/254781764187?text=Hello%20Osman%20Tours!%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: 0781 764 187
          </a>
        </li>
        <li>
          <a href="mailto:osmantraveltours254@gmail.com">
            Email: osmantraveltours254@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/osmanibrahim5181"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram: @osmanibrahim5181
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/osman597157"
            target="_blank"
            rel="noopener noreferrer">
            Twitter: @osman597157
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer">
          </a>
        </li>
      </ul>
    </div>
  );
}
