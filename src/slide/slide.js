import React from 'react';
import './slide.scss'; // Ensure you have your styles

const Slide = () => {
  return (
    <section id="slideshow">
      {/* Client Name or Title */}
      <h1 className="slideshow-title">Our Top Client's</h1>
      
      <div className="entire-content">
        <div className="content-carrousel">
          <figure className="shadow">
            <img
              src="https://pmrconline.in/logo.png"
              alt="Slide 1"
            />
          </figure>
          <figure className="shadow">
            <img
              src="https://www.hindustanpetroleum.com/images/logo.png"
              alt="Slide 2"
            />
          </figure>
          <figure className="shadow">
            <img
              src="https://iocl.com/assets/images/logo.gif"
              alt="Slide 2"
            />
          </figure>
          <figure className="shadow">
            <img
              src="https://state.bihar.gov.in/main/cache/1/SLIDER/bihar-logo-red.png"
              alt="Slide 2"
            />
          </figure>
          <figure className="shadow">
            <img
              src="https://i.postimg.cc/xTZY77mL/hp-gas-logo-6-F3371-B24-B-seeklogo-com-removebg-preview.png"
              alt="Slide 2"
            />
          </figure>
          <figure className="shadow">
            <img
              src="https://nhai.gov.in/assets/images/clientlogo4.png"
              alt="Slide 2"
            />
          </figure>
          
          {/* Add the remaining figures here */}
        </div>
      </div>
    </section>
  );
};

export default Slide;
