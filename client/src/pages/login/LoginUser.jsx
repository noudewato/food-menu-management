import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./login.css"

const LoginUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [navigate, userInfo])

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordError, setpasswordError] = useState("");
   const [emailError, setemailError] = useState("");
  
   const handleValidation = (e) => {
     let formIsValid = true;

     if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
       formIsValid = false;
       setemailError("Email Not Valid");
       return false;
     } else {
       setemailError("");
       formIsValid = true;
     }

     if (!password.match(/^[a-zA-Z]{8,22}$/)) {
       formIsValid = false;
       setpasswordError(
         "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
       );
       return false;
     } else {
       setpasswordError("");
       formIsValid = true;
     }

     return formIsValid;
   };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    handleValidation()
  };

  return (
    <div className="LoginUser">
      <Header />
      <Container>
        <Row>
          <Col md={6} className="mx-auto my-5 p-3 bg-white">
            <div>
              <div>
                <h2>Login</h2>
              </div>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                {emailError && <Message variant="danger">{emailError}</Message>}
                <Form.Group className="mb-3" controlId="number">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter number"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {passwordError && <Message variant="danger">{passwordError}</Message>}
                <Button type="submit" className="continue">
                  Login
                </Button>
              </Form>
            </div>

            <div className="bottom">
              Don't have an Account yet?
              <Link to="/registerUser"> Register </Link>
            </div>

            <div className="forgot">
              <Link to="forgotPassword">forgotPassword</Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginUser;
