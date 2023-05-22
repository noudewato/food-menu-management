import React, {useState} from "react";
import { Col, Container, ListGroup, Row, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { addToCart, removeFromCart, reduceItemFromCart } from "../../actions/cartActions";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
   const { cartItems, deliverAddress, paymentMethod } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkOutHandler = () => {
    if (!userInfo) {
      alert("please login");
      navigate("/loginUser");
    } else if (cartItems.length === 0) {
      alert("your cart is empty");
      navigate("/product");
    } else {
      navigate("/deliverAddress");
    }
  };

  const [address, setAddress] = useState(deliverAddress?.address);
  const [phonenumber, setPhoneNumber] = useState("");      
    
  const [paymentMethodName , setPaymentMethod] = useState(paymentMethod || 'mobile money' || 'cash on delivery')

  return (
    <div className="cart">
      <Header />
      <div className="cart__content">
        <Container>
          <Row>
            <Col sm={8}>
              <h2 className="my-3">My Cart</h2>
              {cartItems.length === 0 ? (
                <Message>
                  Your Cart is Empty <Link to="/menu">Order now</Link>
                </Message>
              ) : (
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={3} className="d-flex align-items-center">
                          <img
                            width="100px"
                            height="100px"
                            src={item.image}
                            className="cart__item__image"
                            alt={item.name}
                          />
                        </Col>
                        <Col md={3} className="d-flex align-items-center">
                          <h5>
                            <span className="itemName">Name:</span>
                          </h5>{" "}
                          <h5>{item.name}</h5>
                        </Col>
                        <Col md={2} className="d-flex align-items-center">
                          <h5>
                            <span className="itemQty">Qty: </span>
                          </h5>
                          <h4>
                            <button
                              className="btn__minus"
                              onClick={() => {
                                dispatch(reduceItemFromCart(item));
                              }}
                              disabled={item.qty === 1}
                            >
                              -
                            </button>
                            {item.qty}
                            <button
                              className="btn__plus"
                              onClick={() => {
                                dispatch(addToCart(item, item.qty + 1));
                              }}
                            >
                              +
                            </button>
                          </h4>
                        </Col>
                        <Col md={2} className="d-flex align-items-center">
                          <h5>
                            <span className="itemPrice">Price: </span>
                          </h5>
                          <h4>
                            <span>₵</span>
                            {item.price}
                          </h4>
                        </Col>
                        <Col md={2} className="d-flex align-items-center">
                          <Button
                            type="button"
                            variant="ligth"
                            onClick={() => {
                              dispatch(removeFromCart(item));
                            }}
                          >
                            <DeleteIcon className="text-danger" />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Customer Info</h2>
                  <Form>
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
                  </Form>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup>
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
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>

              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <h4>Subtotal Items{cartItems.length}</h4>
                    Subtotal: <span>₵ </span>
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button onClick={checkOutHandler} className="Checkout">
                      Checkout (
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                      )
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
