import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUser } from "../../actions/userActions";
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import Layout from "../layout/Layout";


const EditUser = () => {

const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userUpdated = useSelector((state) => state.userUpdated);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdated;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET
      })
      navigate("/admin/manage-user");
    } else {
      if (!user?.name || user._id !== id) {
        dispatch(getUserProfile(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
    
  }, [id, user, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <Layout>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      <div className="dataTable">
        <Row>
          <Col className="ms-3">
            <Link to="/admin/manage-user">
              <h4>Go Back</h4>
            </Link>
          </Col>
          <Col className="text-end me-3">
            <h4>Edit User</h4>
          </Col>
        </Row>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="dataTable">
          <Row className="justify-constant-md-center m-auto w-50 ">
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mt-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Form.Group>

              <Form.Group controlId="email" className="mt-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="isAdmin" className="mt-3">
                <Form.Check
                  type="checkbox"
                  checked={isAdmin}
                  label="Is Admin"
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>

              <Row>
                <Col className="mt-3">
                  <Button
                    type="submit"
                    className="py-1 mb-4 btn-block btn-lg w-100"
                    variant="primary"
                  >
                    Edit User
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default EditUser;
