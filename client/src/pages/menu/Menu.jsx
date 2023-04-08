import React from "react";
import AllProduct from "../../components/allproducts/AllProduct";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import "./menu.css";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

const Menu = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/menu/search/${keyword}`);
    } else {
      navigate("/menu");
    }
  };
  return (
    <section className="Menu">
      <Header />
      <div className="menu__content">
        <div className="menu__title">
          <h2>Our Menu</h2>
          <Form onSubmit={searchHandler} className="menu-search">
            <InputGroup>
              <Form.Control
                placeholder="Search..."
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                search
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
      <Container>
        <AllProduct />
      </Container>
      <Footer />
    </section>
  );
};

export default Menu;
