import React, { useState } from "react";
import "./payment.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Form } from "react-bootstrap";

const PaymentMethod = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="payment__content">
          <h1>Payment Method</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Mobile Money" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Mobile Money" />
            </Form.Group>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentMethod;
