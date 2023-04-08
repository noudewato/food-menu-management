import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import pizzaslider from "./pizzaslider.png";
import "./aboutus.css"
import AOS from "aos"

const AboutUs = () => {

   AOS.init({
     offset: 120, // offset (in px) from the original trigger point
     delay: 100, // values from 0 to 3000, with step 50ms
     duration: 2000, // values from 0 to 3000, with step 50ms
     easing: "ease", // default easing for AOS animations
     once: true, // whether animation should happen only once - while scrolling down
     anchorPlacement: "top-bottom",
   });
  
  
  return (
    <section className="Reviews">
      <Container>
        <Row>
          <Col
            sm={12}
            lg={6}
            className="about__content"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <h2 className="mb-1">
              ABOUT <span className="joy"> US</span>
            </h2>
            {/* 
            <div className="about__text">
              <span className="about__icon">
                <i class="ri-check-double-line"></i>
              </span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
              expedita recusandae unde nihil ea optio. Placeat, aut labore
            </div> */}

            <div
              className="about__text"
              data-aos="fade-right"
              data-aos-once="true"
            >
              <span className="about__icon">
                <i class="ri-check-double-line"></i>
              </span>
              We are an innovative restaurant. We are deeply passionate about
              ingredients, health, wellness and bringing joy to our community
              through our food and service.
            </div>

            <div
              className="about__text"
              data-aos="fade-right"
              data-aos-once="true"
            >
              <span className="about__icon">
                <i class="ri-check-double-line"></i>
              </span>{" "}
              We set out to make healthy, delicious and freshly prepared food
              easily accessible.
            </div>

            <div
              className="about__text mb-4"
              data-aos="fade-right"
              data-aos-once="true"
            >
              <span className="about__icon">
                <i class="ri-check-double-line"></i>
              </span>
              We were determined to serve our community. This was our mission
              then, and still remains our mission now.
            </div>

            <div className="mb-4">
              <Link to="/about" className="viewmore">
                Read More
              </Link>
            </div>
          </Col>

          <Col
            sm={12}
            lg={6}
            className="about__content my-3"
            data-aos="fade-left"
            data-aos-once="true"
          >
            <img
              src={pizzaslider}
              alt=""
              width=""
              height=""
              className="w-100"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
