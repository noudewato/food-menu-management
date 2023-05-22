import React from "react";
import "./managecategory.css";
import Layout from "../../components/layout/Layout";
import CategoryDatatable from "../../components/dataTable/CategoryDatatable";
import { Row, Col, Button } from "react-bootstrap";
import {Link} from "react-router-dom"
const OrderList = () => {
  return (
    <div>
      <Layout>
        <div className="category__header">
          <Row>
            <Col className="d-flex align-items-center">
              <h2>Manage Categories</h2>
            </Col>
            <Col className="text-end">
              <Link to="/admin/add-category">
                <Button className="my-3 product__btn">
                  <i class="ri-add-line"></i> Create Category
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <CategoryDatatable />
      </Layout>
    </div>
  );
};

export default OrderList;
