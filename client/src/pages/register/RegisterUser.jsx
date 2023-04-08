import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./register.css";

const RegisterUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
    navigate("/");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="LoginUser">
      <Header />
      <Container>
        <Row>
          <Col className="mx-auto my-3 bg-white p-3">
            <div>
              <div>
                <h2>Register</h2>
              </div>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="number">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter number"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter number"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="continue">
                  Register
                </Button>
              </Form>
            </div>

            <div className="bottom">
              already have an Account?<Link to="/loginUser"> Login </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default RegisterUser;
