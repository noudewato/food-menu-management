import React from "react";
import "./heroSlider.css";
import { Col, Container } from "react-bootstrap";
import Slider from 'react-slick'
import {sliderData} from '../../assets/slider'

const HeroSlider = () => {
   const settings = {
     infinite: true,
     speed: 300,
     slidesToShow: 1,
     duration: 100,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 3000,
   };
    return (
      <section className="heroSlider">
        <Container>
          <Slider {...settings}>
            {sliderData.map((item) => (
              <div>
                <div className="slider__wrapper d-flex align-items-center justify-content-between p-5">
                  <div className="slider__content w-50 ps-2">
                     <Col sm={6} lg={6} className="w-100">
                      <h1 className="mb-3 ttdd">{item.title}</h1>
                      <p className="mb-3 ttddt">{item.description}</p>
                    <button className="explore-btn">Check Our Menu</button>
                    </Col>
                    </div>
                  

                  <div className="slider__img w-50">
                    <Col sm={6} lg={6} className="w-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-100"
                      />
                    </Col>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
    );
};

export default HeroSlider;
