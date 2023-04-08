import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import "./orderList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../actions/orderActions";
import { ListGroup, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log(order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <Layout>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <div className="order__container">
            <div className="order__content">
              <h4 className="order__message">
                Thanks for your Order,
                <span className="order__message__name">Fawaz</span>!
              </h4>
              <hr />
              <ListGroup>
                <p>
                  Receipt: #{order?._id}
                  <b></b>
                </p>

                <p>Phone Number: {order?.deliverAddress?.phonenumber}</p>

                <p>Address: {order?.deliverAddress?.address}</p>

                <p>Order Date: {order?.createdAt}</p>

                {order?.orderItems?.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <img
                          width="100px"
                          height="100px"
                          src={item.image}
                          className="cart__item__image"
                          alt={item.name}
                        />
                      </Col>

                      <Col
                        md={5}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <h5>{item.name}</h5>
                      </Col>

                      <Col md={3} className="d-flex align-items-center">
                        <b className="me-2">Qty: </b>
                        {item.qty}
                      </Col>

                      <Col md={2} className="d-flex align-items-center">
                        <b className="me-2">Price: </b>₵
                        {(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <ListGroup className="tax">
                <Row>
                  <Col></Col>
                  <Col>
                    <div className="orderprices">
                      <h6>Subtotal</h6>
                      <p> {order?.orderItems?.reduce((acc, item) => acc + item.qty * item.price,0).toFixed(2)}</p>
                    </div>
                    <div className="orderprices">
                      <h6>taxPrice</h6>
                      <p> {order?.taxPrice}</p>
                    </div>
                    <div className="orderprices">
                      <h6>deliverPrice</h6>
                      <p> {order?.deliverPrice}</p>
                    </div>
                  </Col>
                </Row>
              </ListGroup>

              <div className="my-3 text-end">
                <h5>Total Paid</h5>
                {order?.totalPrice}
              </div>
            </div>
          </div>
        )}
      </Layout>
  );
};

export default OrderPage;
