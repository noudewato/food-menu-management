import React, { useState, useEffect } from "react";
import axios from "axios"
import "./userprofile.css";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, userUpdateProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_DETAILS_RESET } from "../../constants/userConstants";
// import { Link} from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);

  const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user?.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_DETAILS_RESET });
        dispatch(getUserProfile("profile"));
        navigate("/user-profile");
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.image)
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

   const uploadingHandler = async (e) => {
     const file = e.target.files[0];
     const formData = new FormData();
     formData.append("image", file);
     setUploading(true);

     try {
       const config = {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       };

       const { data } = await axios.post("/api/upload", formData, config);

       setImage(data);
       setUploading(false);
     } catch (error) {
       console.error(error);
       setUploading(false);
     }
   };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    }
    dispatch(userUpdateProfile({ id: user._id, name, image, email, password }));
    navigate('/')
  };

  return (
    <>
      <Header />
      <div className="profileContainer">
        <Container>
          <Row>
            <Col md={6} className="mx-auto my-5 p-3 bg-white">
              <Image src={user?.image} alt={user?.name} fluid />
            </Col>
            <Col md={6} className="mx-auto my-5 p-3 bg-white">
              <h2>User Profile</h2>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="image" className="mt-4">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    value={image}
                    placeholder=" "
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Form.Control
                    type="file"
                    className="mt-1"
                    onChange={uploadingHandler}
                  />
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col className="py-3">
                    <Button
                      type="submit"
                      variant="primary"
                      className="continue"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
