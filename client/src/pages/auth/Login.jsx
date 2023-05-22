import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import './auth.css'

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/admin-dashboard");
    } else if (userInfo?.isAdmin === false) {
      navigate("/deliverAddress");
    } else {
      navigate("/login")
    }
  }, [navigate, userInfo]);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="Login">
        <div className="container__content">
          <div className="top">
            <h2>Login</h2>
          </div>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <div className="center">
            <form onSubmit={submitHandler}>
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

              <button className="submit">Submit</button>
            </form>
          </div>

          <div className="bottom">
            Don't have an Account yet?<Link to="/register"> Register </Link>
          </div>

          <div className="forgot">
            <Link to="forgotPassword">forgotPassword</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
