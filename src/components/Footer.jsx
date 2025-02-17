import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'; // Import necessary icons
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="title">Social Medias</p>
        <div className="social-icons">
          <a 
            href="https://www.youtube.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon youtube">
            <FaYoutube size={32} />
          </a>
          <a 
            href="https://www.instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon instagram">
            <FaInstagram size={32} />
          </a>
          <a 
            href="https://www.facebook.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon facebook">
            <FaFacebook size={32} />
          </a>
          <a 
            href="https://wa.me/yourwhatsappnumber" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon whatsapp"> {/* Replace with your WhatsApp link */}
            <FaWhatsapp size={32} />
          </a>
        </div>
      </div>
      <p className="footer-text">© 2025 Dormitory App | All rights reserved</p>
    </footer>
  );
};

export default Footer;
