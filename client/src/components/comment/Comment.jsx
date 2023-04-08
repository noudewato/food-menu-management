import React from "react";
import { Container, Row, Col,Form, Button, InputGroup } from "react-bootstrap";
import "./comment.css";

const Comment = () => {
  return (
    <section className="Comment">
      <Container>
        <Row>
          <Col sm={12} md={12} lg={12} classNamem="m-auto text-center">
            <h3 className="comment__title">NEWSLETTER</h3>
            <p className="comment__text">Get timely Update From Us</p>
          </Col>
        </Row>
        <div className="comment__form my-3">
            <Form>
              <InputGroup>
                <Form.Control type="text" placeholder="enter your email" />
                <Button type="submit" variant="danger" className="suscribe-btn">Suscribe</Button>
              </InputGroup>
            </Form>
        </div>
      </Container>
    </section>
  );
};

export default Comment;
