 import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { getOrderDetails } from "../../actions/orderActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import "./orderDetails.css";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  useEffect(() => {
      dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  console.log(order);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="orderDetails">
      <Header />
      <Container>
        <main>
          {" "}
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h3>#{order?._id}</h3>
                  <p></p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default OrderDetails;
