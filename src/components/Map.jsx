import React from 'react';
import '../css/Map.css'; // Add any additional styles in this CSS file

const Contact = () => {
  return (
    <div className="map-container">
      <iframe
        className="custom-map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6119.895095373815!2d32.8305345!3d39.9731817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34d0472fe3bd1%3A0xde88e0f1bd8479e9!2zSMWcbGFzIFZha2bDtnkgWsSxxZ9sZMSxbsSxIGVyayDDl2dyZW5pbsSxdXJ0bGFyxLFzxaFrcmUgIMOWxLBkZXJpIMOWemVsIG9ncmVuYyB5dXJkdQ!5e0!3m2!1str!2sus!4v1702535694398!5m2!1str!2sus"
        frameBorder="0"
        allowFullScreen=""
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Contact;
