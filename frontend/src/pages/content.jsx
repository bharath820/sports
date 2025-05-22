import React from 'react';
import Img3 from "../Assetss/logo.jpg";
import Img2 from "../Assetss/Home2.webp";
import Img1 from "../Assetss/ground.jpg"

const About = () => {
  return (
    <div className="container mt-4">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Img2} className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={Img1} className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src={Img3} className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="Slide 3" />
          </div>
        </div>

        {/* Navigation Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    
  );
};

export default About;
