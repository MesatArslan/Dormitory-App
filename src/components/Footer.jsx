import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="title">Follow Us</p>
        <div className="social-icons">
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="icon">
            <FaYoutube size={32} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="icon">
            <FaInstagram size={32} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebook size={32} />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="icon">
            <FaTiktok size={32} />
          </a>
        </div>
      </div>
      <p className="footer-text">© 2025 Dormitory App | All rights reserved</p>
    </footer>
  );
};

export default Footer;
