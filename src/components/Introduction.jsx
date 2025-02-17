import React, { useState } from 'react';
import { Button, Typography, Container, Grid } from '@mui/material';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import the icons from react-icons
import '../css/Introduction.css';
import Ankara1 from'../assets/Ankara1.jpg'
import Ankara2 from'../assets/Ankara2.jpg'
import Ankara3 from'../assets/Ankara3.jpg'

const Introduction = () => {
  const [currentSection, setCurrentSection] = useState('section1'); // State to track the current section
  const [bgImage, setBgImage] = useState(Ankara1); // State to track the background image

  const switchSection = (direction) => {
    if (direction === 'next') {
      setCurrentSection((prev) => {
        const newSection = prev === 'section3' ? 'section1' : `section${parseInt(prev.slice(-1)) + 1}`;
        updateBackgroundImage(newSection);
        return newSection;
      });
    } else if (direction === 'prev') {
      setCurrentSection((prev) => {
        const newSection = prev === 'section1' ? 'section3' : `section${parseInt(prev.slice(-1)) - 1}`;
        updateBackgroundImage(newSection);
        return newSection;
      });
    }
  };

  const updateBackgroundImage = (section) => {
    switch (section) {
      case 'section1':
        setBgImage(Ankara1);
        break;
      case 'section2':
        setBgImage(Ankara2); // Change to the image for section 2
        break;
      case 'section3':
        setBgImage(Ankara3); // Change to the image for section 3
        break;
      default:
        setBgImage(Ankara1); // Default image if no match
        break;
    }
  };

  return (
    <section className="introduction-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay"></div>

      <Container className="content">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <div className="slider-content-area">
              <div className="slide-text">
                {currentSection === 'section1' ? (
                <div>
                  <Typography variant="h3" className="homepage-title">
                    Close to Public Transportation
                  </Typography>
                  <Typography variant="h5" className="homepage-subtitle">
                    Just 200 meters from metro and train stations, bus, and minibus stops.
                  </Typography>
                </div>
              ) : currentSection === 'section2' ? (
                <div>
                  <Typography variant="h3" className="homepage-title">
                    Comfortable Dorm Rooms
                  </Typography>
                  <Typography variant="h5" className="homepage-subtitle">
                    Modern and comfortable rooms offer ideal living spaces for students.
                    Each room includes a spacious study area, comfortable bed, and ample storage space.
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography variant="h3" className="homepage-title">
                    Social Facilities
                  </Typography>
                  <Typography variant="h5" className="homepage-subtitle">
                    With a gym, study rooms, and communal living spaces, there are plenty of opportunities 
                    for social activities. The dorm encourages interaction and a sense of community among students.
                  </Typography>
                </div>
              )}
                <div className="slider-content-btn">
                  <div className="transition"></div>
                  <div className="transition"></div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* Buttons to switch sections */}
      <div className="section-switch-buttons">
        <Button
          className="switch-button left"
          variant="contained"
          onClick={() => switchSection('prev')}
        >
          <FaArrowLeft size={30} color="#fff" /> {/* Using the left arrow icon */}
        </Button>
        <Button
          className="switch-button right"
          variant="contained"
          onClick={() => switchSection('next')}
        >
          <FaArrowRight size={30} color="#fff" /> {/* Using the right arrow icon */}
        </Button>
      </div>
    </section>
  );
};

export default Introduction;
