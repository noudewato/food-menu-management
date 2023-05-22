import React, { useEffect, useState } from "react";
import "./category.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../Message";
import Message from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategoryDetails,
  updateCategory,
} from "../../actions/categoryActions";
import { CATEGORY_UPDATE_RESET } from "../../constants/categoryConstant";
import axios from "axios";
import Layout from "../layout/Layout";
const EditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const categoryDetails = useSelector((state) => state.categoryDetails);

  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: CATEGORY_UPDATE_RESET,
      });
      navigate("/manage-category");
    } else {
      if (!category?.name || category._id !== id) {
        dispatch(listCategoryDetails(id));
      } else {
        setName(category.name);
        setImage(category.image);
        setDescription(category.description);
      }
    }
  }, [id, category, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: id,
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
      <div className="dataTable">
        <Row>
          <Col className="ms-3">
            <Link to="/manage-product">
              <h4>Go Back</h4>
            </Link>
          </Col>
          <Col className="text-end me-3">
            <h4>Edit Category</h4>
          </Col>
        </Row>
      </div>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="dataTable">
          <Row className="justify-constant-md-center m-auto w-50">
            <Col className="text-center">
              <h2>Update Product</h2>
            </Col>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mt-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
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
                  as="textarea"
                  row={3}
                  type="text"
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
                    Edit Category
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

export default EditCategory;
