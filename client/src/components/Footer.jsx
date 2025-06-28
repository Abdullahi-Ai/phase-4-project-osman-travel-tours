import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <a
          href="https://wa.me/254781764187?text=Hello%20Osman%20Tours!%20I%20would%20like%20to%20inquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <img src="/assets/whatsapp (1).png" alt="WhatsApp" className="footer-icon" />
          Contact us on WhatsApp 0781764187
        </a>

        <a href="mailto:osmantraveltours430@gmail.com" aria-label="Email">
          <img src="/assets/mail.png" alt="Email" className="footer-icon" />
          Email us through osmantraveltours254@gmail.com
        </a>

        <a
          href="https://www.instagram.com/osmanibrahim5181"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src="/assets/instagram.jpeg" alt="Instagram" className="footer-icon" />
          Instagram us through osmanibrahim5181
        </a>

        <a
          href="https://twitter.com/osman597157"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <img src="/assets/twitter.png" alt="Twitter" className="footer-icon" />
          Text us through osman597157
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <img src="/assets/youtube.png" alt="YouTube" className="footer-icon" />
          YouTube
        </a>
      </div>

      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Osman Travel Tours. All rights reserved.
      </div>
    </footer>
  );
}
