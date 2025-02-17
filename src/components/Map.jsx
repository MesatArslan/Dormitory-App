import React from 'react';
import '../css/Map.css'; // Add any additional styles in this CSS file

const Contact = () => {
  return (
    <div className="map-container">
      <iframe
        className="custom-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6249.14405250216!2d32.8597!3d39.9276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34d063bfa1c7d%3A0xc673bcd7fd76a15a!2sK%C4%B1z%C4%B1lay%2C%20Ankara!5e0!3m2!1str!2sus!4v1702641845020!5m2!1str!2sus"
        frameBorder="0"
        allowFullScreen=""
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Contact;
