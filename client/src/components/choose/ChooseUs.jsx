import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./chooseus.css";

const ChooseUs = () => {
  return (
    <div className="choose">
      <Container>
        <h2 className="text-center mb-5">
          WHY <span className="joy">CHOOSE US</span>
        </h2>
        <Row>
          <Col sm={12} lg={4} md={12}>
            <div className="choose__box">
              <span className="choose__icon">
                <i class="ri-e-bike-2-line"></i>
              </span>
              <h4 className="choose__title">Fresh Food</h4>
              <p className="choose__text">
                We Serve The Best And Fresh Quality Food
              </p>
            </div>
          </Col>

          <Col sm={12} lg={4} md={12}>
            <div className="choose__box">
              <span className="choose__icon">
                <i class="ri-hospital-line"></i>
              </span>
              <h4 className="choose__title">Best offer</h4>
              <p className="choose__text">
                We give the Best Offer To Our Valuable Customers
              </p>
            </div>
          </Col>

          <Col sm={12} lg={4} md={12}>
            <div className="choose__box">
              <span className="choose__icon">
                <i class="ri-24-hours-line"></i>
              </span>
              <h4 className="choose__title">Delicious</h4>
              <p className="choose__text">
                We give the Best Offer To Our Valuable Customers
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChooseUs;
