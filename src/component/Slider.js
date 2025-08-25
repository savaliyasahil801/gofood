import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../images/pizza-paneer-tikka.webp";
import img2 from "../images/slider-pizza.jpg";
import img3 from "../images/pizza-margherita.webp";
import '../App.css';

const SearchForm = ({Search,setsearch}) => (
  <div className="d-flex justify-content-center">
    <input type="search" className="form-control me-2 bg-transparent text-light slider_input" placeholder="search" value={Search} onChange={(e) => {setsearch(e.target.value)}} />
    {/* <button className="btn btn-success text-light" type="submit">Search</button> */}
  </div>
);

const Slider = () => {
  return (
    <div>
      <Carousel fade>
        {[img1, img2, img3].map((img, index) => (
          <Carousel.Item key={index}>
            <img src={img} className="slider_image" style={{ filter: "brightness(30%)" }} alt="..." />
            <div className="carousel-caption" style={{ zIndex: 10 }}>
              <SearchForm />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
