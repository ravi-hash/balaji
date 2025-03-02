import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './bann.scss';

const Bann = () => {
  return (
    <div className="bann-container">
      {/* First Banner */}
      <div className="bann">
        <div className="bann__content">
          <h2 className="bann__title">High Quality Personalized Wear</h2>
          <p className="bann__subtitle">Wear your Brand with Pride</p>
          <Link to="/view-all-products" className="bann__button">
            Shop Now
          </Link>
          <p className="bann__price">1 Starting at Rs. 550</p>
        </div>
      </div>

      {/* Second Banner */}
      <div className="bann2">
        <div className="bann__content2">
          <h2 className="bann__title2">High Quality Personalized Card</h2>
          <p className="bann__subtitle2">Make your Brand with Pride</p>
          <Link to="/view-all-products" className="bann__button2">
            Shop Now
          </Link>
          <p className="bann__price2"> Starting at Rs. 100</p>
        </div>
      </div>

      {/* 4th Banner */}
      <div className="bann3">
      
        <div className="bann__content3">
          
        </div>
      </div>

       {/* 4th Banner */}
      <div className="bann4">
        <div className="bann__content4">
          
        </div>
      </div>
    </div>
  );
};

export default Bann;
