import React, { useEffect, useState } from "react";
import "./category.css"
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Message";
import Message from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "../../constants/categoryConstant";
import axios from "axios";
import Layout from "../layout/Layout";


const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryCreate;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    
     useEffect(() => {
       if (!userInfo.isAdmin) {
         navigate("/login");
       }
     }, [dispatch, navigate]);

  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: CATEGORY_CREATE_RESET,
      });
      navigate("/manage-category");
    }
  }, [dispatch, navigate, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCategory({
        name,
        image,
        description,
      })
    );
  };

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
  return (
    <Layout>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <div className="dataTable">
        <Row>
          <Col className="ms-3">
            <Link to="/manage-product">
              <h4>Go Back</h4>
            </Link>
          </Col>
          <Col className="text-end me-3">
            <h4>Add Category</h4>
          </Col>
        </Row>
      </div>
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

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col className="mt-3">
                <Button
                  type="submit"
                  className="py-1 mb-4 btn-block btn-lg w-100"
                  variant="primary"
                >
                  Add Category
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </Layout>
  );
};

export default AddCategory;
