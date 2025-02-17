import React from 'react';
import '../css/Gallery.css';
import image from '../assets/Ankara3.jpg'; // Import the image once and reuse it

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
      <p>Gallery content here...</p>
      <div className="gallery-grid">
        <div className="gallery-item">
          <img src={image} alt="Image 1" />
        </div>
        <div className="gallery-item">
          <img src={image} alt="Image 2" />
        </div>
        <div className="gallery-item">
          <img src={image} alt="Image 3" />
        </div>
        <div className="gallery-item">
          <img src={image} alt="Image 4" />
        </div>
        <div className="gallery-item">
          <img src={image} alt="Image 5" />
        </div>
        <div className="gallery-item">
          <img src={image} alt="Image 6" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
