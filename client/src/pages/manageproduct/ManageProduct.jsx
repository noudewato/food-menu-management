import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataTable";
import Layout from "../../components/layout/Layout";
import "./manageproduct.css";

const ManageProduct = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const [keyword, setKeyword] = useState("");

  return (
    <Layout>
      <Row className="align-items-center dataTable">
        <Col>
          <h2 className="product__title">Manage Products</h2>
        </Col>
        <Col className="m-auto">
          <Form>
            <Form.Control
              placeholder="Search Products..."
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
          </Form>
        </Col>
        <Col className="text-end">
          <Link to="/admin/add-product">
            <Button className="my-3 product__btn">
              <i class="ri-add-line"></i> Create Product
            </Button>
          </Link>
        </Col>
      </Row>
      <DataTable />
    </Layout>
  );
};

export default ManageProduct;
