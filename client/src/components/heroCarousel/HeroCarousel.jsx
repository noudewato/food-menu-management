import React from "react";
import "./herocarousel.css";
import { Carousel } from "react-bootstrap"
import dinner from "../../images/dinner.jpg";
import breakfast from "../../images/newbreakfast1.jpg"
import burger from "../../images/burger.jpg";

const HeroCarousel = () => {
  return (
    <section className="HeroCarousel">
      <Carousel fade>
        <Carousel.Item className="carouselItem">
          <img src={breakfast} className="carousel__image" alt="" />
          <Carousel.Caption className="carouselContent">
            <h1 className="animate__animated animate__fadeInDown animate__delay-1s">
              Healthy <span className="joy">Breakfast</span>
            </h1>
            <p className="animate__animated animate__fadeInUp animate__delay-1s carousel__paragraph">
              Nulla vitae elit libero, a pharetra augue mollis interdum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam
              ipsum nemo, beatae vero et ducimus asperiores? Autem quo fuga
              veniam, reprehenderit dolore voluptate iure incidunt, magnam quod
              harum dolorem.
            </p>
            <button className="animate__animated animate__fadeInUp animate__delay-2s explore-btn">
              Check Our Menu
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carouselItem" nextLabel="null">
          <img src={burger} className="carousel__image" alt="" />
          <Carousel.Caption className="carouselContent">
            <h1 className="animate__animated animate__fadeInDown animate__delay-1s h">
              Delicious <span className="joy">Lunch</span>
            </h1>
            <p className="animate__animated animate__fadeInUp animate__delay-1s carousel__paragraph">
              Nulla vitae elit libero, a pharetra augue mollis interdum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam
              ipsum nemo, beatae vero et ducimus asperiores? Autem quo fuga
              veniam, reprehenderit dolore voluptate iure incidunt, magnam quod
              harum dolorem.
            </p>
            <button className="animate__animated animate__fadeInUp animate__delay-2s explore-btn">
              Check Our Menu
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carouselItem">
          <img src={dinner} className="carousel__image" alt="" />
          <Carousel.Caption className="carouselContent">
            <h1 className="animate__animated animate__fadeInDown animate__delay-1s">
              Tasty <span className="joy"> Dinner</span>
            </h1>
            <p className="animate__animated animate__fadeInUp animate__delay-1s carousel__paragraph">
              Nulla vitae elit libero, a pharetra augue mollis interdum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam
              ipsum nemo, beatae vero et ducimus asperiores? Autem quo fuga
              veniam, reprehenderit dolore voluptate iure incidunt, magnam quod
              harum dolorem.
            </p>
            <button className="animate__animated animate__fadeInUp animate__delay-2s explore-btn">
              Check Our Menu
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
