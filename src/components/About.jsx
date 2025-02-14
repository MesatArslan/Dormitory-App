import React, { useState } from 'react';
import GeneralInformation from './GeneralInformation'; 
import Facilities from './Facilities';
import Gallery from './Gallery';
import Map from './Map';
import '../css/About.css'

const About = () => {
  // State to keep track of the active section
  const [activeTab, setActiveTab] = useState('general');

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="about-container">
      {/* Navigation Buttons */}
      <div className="tab-buttons">
        <button 
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => handleTabChange('general')}
        >
          General Information
        </button>
        <button 
          className={activeTab === 'facilities' ? 'active' : ''}
          onClick={() => handleTabChange('facilities')}
        >
          Facilities
        </button>
        <button 
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => handleTabChange('gallery')}
        >
          Gallery
        </button>
        <button 
          className={activeTab === 'map' ? 'active' : ''}
          onClick={() => handleTabChange('map')}
        >
          Map
        </button>
      </div>

      {/* Render content based on the activeTab */}
      <div className="tab-content">
        {activeTab === 'general' && <GeneralInformation />}
        {activeTab === 'facilities' && <Facilities />}
        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'map' && <Map />}
      </div>
    </div>
    
  );
};

export default About;
