import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./contact.css";

const Contact = () => {
  return (
    <div className="Contact">
      <Header />
      <div className="menu__content">
        <div className="menu__title">
          <h2>Contact</h2>
        </div>
      </div>

      <Container>
        <Row className="contact__content">
          <Col sm={12} lg={5} className="contact__details">
            <div className="contact__details">
              <div className="location my-4  mb-2">
                <span className="icon">
                  <i className="ri-map-pin-line"></i> LOC. SATELITE JUNCTION
                  KUNTUNSE <br />{" "}
                  <span className="text-target">
                    NEAR AMBASSADOR PARC(ACCRA)
                  </span>
                </span>
              </div>
              <div className="whatsapp my-4">
                <span className="icon">
                  <i className="ri-whatsapp-line"></i> 0204220655
                </span>
              </div>
              <div className="contact__number my-4">
                <span className="icon">
                  <i className="ri-phone-line"></i> 0597385380 / 0599787493
                </span>
              </div>

              <div className="email__address my-4">
                <span className="icon">
                  <i className="ri-mail-line"></i> joypizzandkitchen@yahoo.com /
                  joycepizzaandkitchen@gmail.com
                </span>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={7} className="contact__message">
            <h3 className="contact__form__title mb-4">
              Send Us a Quick Message
            </h3>
            <Form>
              <Form.Group controlId="username" className="mb-4">
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group controlId="email" className="mb-4">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="number" className="mb-4">
                <Form.Control type="text" placeholder="Phone Number" />
              </Form.Group>
              <Form.Group controlId="email" className="mb-4">
                <Form.Control
                  as="textarea"
                  row={7}
                  placeholder="Your Message"
                />
              </Form.Group>

              <Button type="submit" className="btn-contact">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Contact;
