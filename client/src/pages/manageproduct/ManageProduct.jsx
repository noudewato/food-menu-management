import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./manageproduct.css";
import ProductDatatable from "../../components/dataTable/ProductDatatable";

const ManageProduct = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return (
    <Layout>
      <Row className="align-items-center dataTable">
        <Col>
          <h2 className="product__title">Manage Products</h2>
        </Col>
        <Col className="text-end">
          <Link to="/admin/add-product">
            <Button className="my-3 product__btn">
              <i class="ri-add-line"></i> Create Product
            </Button>
          </Link>
        </Col>
      </Row>
      <ProductDatatable/>
    </Layout>
  );
};

export default ManageProduct;
