import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "./menu-slider.css";
import BeefSandwich from "./BeefSandwich.jpg";
import mypizza from "./mypizza.jpg";
import fried1 from "./fried1.jpg";
import burger1 from "./burger1.jpg";
import simplepizza from "./simplepizza.jpg";
import chickensalad from "./Chicken-salad-1.jpg";

const MenuSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400,
    rows: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="Menuslider my-3">
      <Container>
        <Row>
          <Col className="text-center my-3">
            <h1>
              <span className="joy">JOY</span> FOOD
            </h1>
            <p>Our Delicious Food</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Slider {...settings} className="my-3">
              <div className="menu-img-slider">
                <h3>
                  <Row>
                    <Col>
                      <img
                        className="img w-100"
                        src={BeefSandwich}
                        alt=""
                        width="300px"
                        height="300px"
                      />
                    </Col>
                  </Row>
                </h3>
              </div>
              <div className="menu-img-slider">
                <h3>
                  <Row>
                    <Col>
                      <img
                        className="w-100"
                        src={chickensalad}
                        alt=""
                        width="300px"
                        height="300px"
                      />
                    </Col>
                  </Row>
                </h3>
              </div>
              <div className="menu-img-slider">
                <h3>
                  <Row>
                    <Col>
                      <img
                        className="w-100"
                        src={simplepizza}
                        alt=""
                        width="100%"
                        height="300px"
                      />
                    </Col>
                  </Row>
                </h3>
              </div>
              <div>
                <h3>
                  <Row>
                    <Col>
                      <img
                        className="menu-img-slider w-100"
                        src={burger1}
                        alt=""
                        width="300px"
                        height="300px"
                      />
                    </Col>
                  </Row>
                </h3>
              </div>
              <div>
                <h3>
                  <Row>
                    <Col>
                      <img
                        className="menu-img-slider w-100"
                        src={mypizza}
                        alt=""
                        width="300px"
                        height="300px"
                      />
                    </Col>
                  </Row>
                </h3>
              </div>
              <div>
                <h3>
                  <Row>
                    <Col>
                      <img
                        className="menu-img-slider w-100"
                        src={fried1}
                        alt=""
                        width="300px"
                        height="300px"
                      />
                    </Col>
                  </Row>
                </h3>
              </div>
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MenuSlider;
