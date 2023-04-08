import React, { useState } from "react";
import { Container, Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import {
  saveDeliverAddress,
  savePaymentMethod,
} from "../../actions/cartActions";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import "./deliverAddress.css";

const DeliverAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart)
  const { deliverAddress, paymentMethod } = cart;

  const [address, setAddress] = useState(deliverAddress?.address);
  const [phonenumber, setPhoneNumber] = useState('');
  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "Cash On Delivery" || "Mobile Money");

  const deliverAddressHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliverAddress({ address, phonenumber }));
    dispatch(savePaymentMethod(paymentMethodName));
    navigate("/placeOrder");
  };


  return (
    <div>
      <Header />
      <div className="deliver__content">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={8} sm={12}>
              <Form onSubmit={deliverAddressHandler}>
                <ListGroup>
                  <ListGroup.Item>
                    <h2>Customer Info</h2>
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="number">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="enter number"
                        value={phonenumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}

                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup className="my-2">
                  <ListGroup.Item>
                    <h4>Payment Method</h4>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Form.Group className="mb-3">
                      <Form.Check
                        id="Mobile Money"
                        type="radio"
                        label="Mobile Money"
                        value="Mobile Money"
                        checked={paymentMethodName === "Mobile Money"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        id="Cash On Delivery"
                        type="radio"
                        label="Cash On Delivery"
                        value="Cash On Delivery"
                        checked={paymentMethodName === "Cash On Delivery"}
                        onChange={(e) =>setPaymentMethod(e.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
                <Button variant="primary" type="submit" className="continue">
                  Continue
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default DeliverAddress;
