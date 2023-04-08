import React from "react";
import "./popularfood.css";
import products from "../../assets/products";
import { Container, Row, Col, Button } from "react-bootstrap";
import Products from "../product-card/Products";
import AOS from 'aos'
import { Link } from "react-router-dom";

const PopularFood = () => {

  AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 2000, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
     once: true, // whether animation should happen only once - while scrolling down
    anchorPlacement: "top-bottom",
  });
  return (
    <div className="PopularFood mt-5">
      <Container>
        <Row>
          <Col lg={12}>
            <h2
              className="text-center mb-3"
              data-aos="fade-down"
              data-aos-once="true"
            >
              <span className="joy ">YOUR BEST</span> FOOD IN TOWN
            </h2>
            <p
              className="text-center my-1"
              data-aos="fade-up"
              data-aos-once="true"
            >
              Our Best Selling Meals
            </p>
          </Col>

          {products.map((item) => (
            <Col lg={4} xl={3} md={6} sm={12} xs={12} key={item._id}>
              <Products item={item} />
            </Col>
          ))}
        </Row>

        <Row className="my-5">
          <Col className="text-center my-3">
            <Link to="/menu" className="viewmore">
              View More
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PopularFood;
