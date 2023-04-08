import React from "react";
import "./homesection.css";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { slideData } from "../../assets/slide-data";
const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = slideData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };

   const auto = () => {
     slideInterval = setInterval(nextSlide, intervalTime);
   };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
     auto()
    }
    return () => clearInterval(slideInterval)
  }, [currentSlide,autoScroll]);

  return (
    <div className="Homesection">
      {slideData.map((slide, index) => (
        
        <div
          className={index === currentSlide ? "slide current" : "slide"}
          key={index}
        >
          {index === currentSlide && (
            <>
              <img
                src={slide.image}
                alt="slide"
                // width="100%"
                // height="1000px"
                className="homeSliderImage"
              />
              <div className="homeSliderContent">
                <h1 className="homeSliderTitle">{slide.title}</h1>
                <p className="homeSliderText">{slide.description}</p>
                <Row>
                  <Col className="text-start my-4">
                    <Link to="/menu" className="viewmoreh">
                      View More
                    </Link>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </div>
      ))}
      {/* <Container>
        <div className="home__section__content">
          <h1 className="home__section__title">
            Welcome To <span className="joy">Joy Pizza Kitchen</span>
          </h1>
          <p className="home__section__text">
            Here at Joy, our food is so much more than a side dish- It is the
            main attraction. Our meals are carefully curated to represent
            different cultures and flavours.
          </p>
          <Row>
            <Col className="text-start my-4">
              <Link to="/menu" className="viewmoreh">
                View More
              </Link>
            </Col>
          </Row>
        </div>
      </Container> */}
    </div>
  );
};

export default HomeSection;
