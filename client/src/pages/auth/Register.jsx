import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import "./auth.css";
import Header from "../../components/header/Header";

const Register = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const userRegister = useSelector((state) => state.userRegister);

 const { loading, error, userInfo } = userRegister;

 const redirect = location.search ? location.search.split("=")[1] : "/";

 useEffect(() => {
   if (userInfo) {
     navigate("/login");
   }
 }, [navigate, userInfo, redirect]);

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [message, setMessage] = useState(null);

 const submitHandler = (e) => {
   e.preventDefault();
   if (password !== confirmPassword) {
     setMessage("Password do not match");
   }
   dispatch(register(name, email, password));
 };

  return (
    <div>
      <Header/>
      <div className="Register">
        <div className="container__content">
          <div className="top">
            <h2>Register</h2>
          </div>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <div className="center">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className="formcontrol"
                  name="username"
                  value={name}
                  id="username"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="formcontrol"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="formcontrol"
                  name="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="formcontrol"
                  name="password2"
                  value={confirmPassword}
                  id="password2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password "
                />
              </div>

              <button type="submit" className="submit">
                Submit
              </button>
            </form>
          </div>

          <div className="bottom">
            Already have an Account ?<Link to="/login"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
