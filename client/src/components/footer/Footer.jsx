import React from "react";
import "./footer.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <section className="Footer">
      <Container>
        <Row>
          <Col sm={12} lg={4}>
            <div className="header__log">
              <h2>
                <span>
                  <i className="ri-restaurant-2-fill"></i>
                </span>
                Joy Kitchen
              </h2>
              <p>
                <img
                  width="150px"
                  height="150px"
                  src={
                    "https://th.bing.com/th/id/R.ead1cc09632ff8742860aa5f48902db3?rik=FJ5nJaGxTxUW4A&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_216981.png&ehk=i%2bOAZJiwQN1s4CyzTePnq1dkSyBxrCPU6hYKuSavqac%3d&risl=&pid=ImgRaw&r=0"
                  }
                  alt=""
                 className="logoimage"
                />
              </p>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div className="opening__time">
              <h4 className="opening__time__title">Opening Time</h4>
              <p className="opening__time__text">
                <span className="text-target1">WE OPEN</span> 7 DAYS A WEEK
              </p>
              <div className="time__content">
                <p className="single__time__content">
                  <span className="text-target1">BREAKFAST</span> |
                  7:30AM-11:30AM
                </p>
                <p className="single__time__content">
                  <span className="text-target1">LAUNCH & DINNER</span> |
                  11:30AM-10:30PM
                </p>
                <p className="single__time__content">
                  <span className="text-target1">LAST ORDER</span> |
                  10:30PM-11:00PM
                </p>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div className="address__details">
              <h4 className="address__details__title">My Links</h4>
              <div className="location mt-3 mb-2">
                <span className="icon">
                  <i className="ri-map-pin-line"></i> LOC. SATELITE JUNCTION
                  KUNTUNSE <br />{" "}
                  <span className="text-target">
                    NEAR AMBASSADOR PARC(ACCRA)
                  </span>
                </span>
              </div>
              <div className="whatsapp my-2">
                <span className="icon">
                  <i className="ri-whatsapp-line"></i> 0204220655
                </span>
              </div>
              <div className="contact__number my-2">
                <span className="icon">
                  <i className="ri-phone-line"></i> 0597385380 / 0599787493
                </span>
              </div>

              <div className="email__address">
                <span className="icon">
                  <i className="ri-mail-line"></i> joypizzandkitchen@yahoo.com /
                  joycepizzaandkitchen@gmail.com
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="copyright">
        <Row>
          <hr className="mt-3" />
          <Col className="py-1">copyright &copy; Nice tech</Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
