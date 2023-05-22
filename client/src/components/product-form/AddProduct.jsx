import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Message";
import Message from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/productActions";
import { listAdminCategories } from "../../actions/categoryActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import axios from "axios";
import Layout from "../layout/Layout";
const NewProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);

  const { categories } = categoryList;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [uploading, setUploading] = useState(false);
  console.log(category);

  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
      navigate("/manage-product");
    }

    dispatch(listAdminCategories())
  }, [dispatch, navigate, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
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
            <h4>Add Product</h4>
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

            <Form.Group controlId="price" className="mt-4">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
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

            <Form.Group controlId="category" className="mt-4">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </Form.Control>
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
                  Add Product
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </Layout>
  );
};

export default NewProductForm;
