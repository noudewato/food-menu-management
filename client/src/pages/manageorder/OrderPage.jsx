import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { getOrderDetails, orderStatusUpdate } from "../../actions/orderActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import "./orderList.css";
import Layout from "../../components/layout/Layout";

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderStatus = useSelector((state) => state.orderStatus);
  const {
    success: statusSuccess,
    error: statusError,
    loading: statusLoading,
  } = orderStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (statusSuccess) {
      navigate("/manage-order");
    }
  }, [dispatch, navigate, id, statusSuccess]);
  console.log(order);

  const statusHandler = () => {
    dispatch(orderStatusUpdate(order));
  };
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Container>
            <main>
              <Row>
                <Col md={8}>
                  <div className="order__container">
                    <div className="order__content">
                      <h4 className="order__message">
                        Thanks for your Order,
                        <span className="order__message__name">
                          {order?.user?.name}
                        </span>
                        !
                      </h4>
                      <hr />
                      <ListGroup>
                        <p>
                          Receipt: #{order?._id}
                          <b></b>
                        </p>

                        <p>
                          Phone Number: {order?.deliverAddress?.phonenumber}
                        </p>

                        <p>Address: {order?.deliverAddress?.address}</p>

                        <p>Order Date: {order?.createdAt}</p>

                        {order?.orderItems?.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col
                                md={5}
                                className="d-flex align-items-center justify-content-start"
                              >
                                <h4>{item.name}</h4>
                              </Col>

                              <Col
                                md={3}
                                className="d-flex align-items-center justify-content-center"
                              >
                                {item.qty}
                              </Col>

                              <Col
                                md={3}
                                className="d-flex align-items-center justify-content-center"
                              >
                                ₵{(item.qty * item.price).toFixed(2)}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <h4>taxPrice</h4>
                            </Col>
                            <Col
                              md={5}
                              className="d-flex align-items-center justify-content-center pe-6"
                            >
                              ₵ {order?.taxPrice}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <h4>deliverPrice</h4>
                            </Col>
                            <Col
                              md={5}
                              className="d-flex align-items-center justify-content-center pe-6"
                            >
                              ₵ {order?.deliverPrice}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <h4>Subtotal</h4>
                            </Col>
                            <Col
                              md={5}
                              className="d-flex align-items-center justify-content-center pe-6"
                            >
                              ₵{" "}
                              {order?.orderItems
                                ?.reduce(
                                  (acc, item) => acc + item.qty * item.price,
                                  0
                                )
                                .toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <h4>Amount Paid</h4>
                            </Col>
                            <Col
                              md={5}
                              className="d-flex align-items-center justify-content-center pe-6"
                            >
                              ₵ {order?.totalPrice}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </Col>

                <Col md={3} className="m-4">
                  <ListGroup>
                    <div>
                      <ListGroup.Item>
                        <Button className="w-100">Print</Button>
                      </ListGroup.Item>
                      {statusLoading && <Loader />}
                      {statusError && <Message>{statusError}</Message>}
                          {userInfo.isAdmin &&
                            (
                            <ListGroup.Item>
                              <Button
                                type="button"
                                onClick={statusHandler}
                                className="w-100 py-2"
                              >
                                Deliver
                              </Button>
                            </ListGroup.Item>
                          )}
                    </div>
                  </ListGroup>
                </Col>
              </Row>
            </main>
          </Container>
        </div>
      )}
    </Layout>
  );
};

export default OrderPage;
