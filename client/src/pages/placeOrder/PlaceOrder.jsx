import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { Container, ListGroup, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../actions/orderActions";
import Message from "../../components/Message";
import "./placeorder.css";
// import { CLEAR_CART } from "../../constants/cartConstants";
// import { ORDER_CREATE_RESET } from "../../constants/orderConstants";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, deliverAddress, paymentMethod } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createOrder = useSelector((state) => state.createOrder);
  const { error, success, createdOrder } = createOrder;

  useEffect(() => {
    // dispatch({
    //     type: ORDER_CREATE_RESET,
    //   })
    if (success) {
      navigate(`/order/${createdOrder.createdOrder._id}`);
      // eslint-disable-next-line
    }
    // eslint-disable-next-line
  }, [success, navigate, createdOrder]);

  const AddRoundedNumber = (num) =>
    Math.round(num * 100 + Number.EPSILON) / 100;

  cartItems.itemsPrice = AddRoundedNumber(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );

  cartItems.deliverPrice =
    cartItems.itemsPrice > 100
      ? AddRoundedNumber(0.1 * cartItems.itemsPrice)
      : AddRoundedNumber(10);

  cartItems.taxPrice = AddRoundedNumber(0.12 * cartItems.itemsPrice);

  cartItems.totalPrice = AddRoundedNumber(
    cartItems.itemsPrice + cartItems.deliverPrice + cartItems.taxPrice
  );

  const placeOrderHandler = () => {
      //    dispatch({
      //   type: CLEAR_CART,
      // })
    dispatch(
      addOrder({
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        deliverAddress: deliverAddress,
        itemsPrice: cartItems.itemsPrice,
        deliverPrice: cartItems.deliverPrice,
        taxPrice: cartItems.taxPrice,
        totalPrice: cartItems.totalPrice,
      })
      
    );

    // localStorage.removeItem("cartItems")
    // localStorage.removeItem("deliverAddress");
  };

  return (
    <div>
      <Header />
      <div className="main">
        <Container>
          <Row>
            <Col md={8}>
              <h4>Place Your Order</h4>
              <ListGroup className="mb-3">
                <ListGroup.Item>
                  <h5>Customer Details</h5>
                  <p>
                    <b>Name: </b>
                    {userInfo.name}
                  </p>

                  <p>
                    <b>Email: </b>
                    {userInfo.email}
                  </p>

                  <p>
                    <b>Phone Number: </b>
                    {deliverAddress?.phonenumber}
                  </p>
                  <p>
                    <b>Address: </b>
                    {deliverAddress?.address}
                  </p>

                  <Link to="/deliverAddress">
                    <Button>Edit</Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup className="mb-3">
                <ListGroup.Item>
                  <h6>Payment Method</h6>
                  <p>
                    <b>Method:</b>
                    {paymentMethod}
                  </p>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup>
                <ListGroup.Item>
                  <h6>Order Items</h6>
                  {cartItems.lenght === 0 ? (
                    <Message variant="danger">Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={3}>
                              <img
                                width="100px"
                                height="100px"
                                src={item.image}
                                className="cart__item__image"
                                alt={item.name}
                              />
                            </Col>
                            <Col md={4} className="d-flex align-items-center">
                              <h5>{item.name}</h5>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                              <b>
                                {item.qty} X ₵{item.price} = ₵
                                {(item.qty * item.price).toFixed(2)}
                              </b>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}

                  <Link to="/menu">
                    <Button>Edit</Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <h4>Order Summary</h4>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>items</Col>
                    <Col>₵{cartItems.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Deliver</Col>
                    <Col>₵{cartItems.deliverPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₵{cartItems.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>{" "}
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>₵{cartItems.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <Button
                  type="button"
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {error && <Message variant="danger">{error}</Message>}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default PlaceOrder;
