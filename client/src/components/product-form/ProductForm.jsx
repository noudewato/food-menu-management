import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../actions/productActions";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
  // const [price, setPrice] = useState(0);

  const [inputForm, setInputForm] = useState({
    name: "",
    category: "",
    price: 0
  })

  const {name,category,price} = inputForm

  const inputValue = (e) => {
    setInputForm({...inputForm, [e.target.name]:e.target.value})
  }

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, category, price));
  };

  return (
    <div>
      <Form onSubmit={formHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => inputValue(e)}
            placeholder="enter name..."
          />
        </Form.Group>
        <Form.Group controlId="category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={category}
            onChange={(e) => inputValue(e)}
            placeholder="enter category..."
          />
        </Form.Group>
        <Form.Group controlId="price" className="my-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="Number"
            value={price}
            onChange={(e) => inputValue(e)}
          />
        </Form.Group>
        <Button type="submit">Add Product</Button>
      </Form>
    </div>
  );
};

export default ProductForm;
