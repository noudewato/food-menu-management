import React from "react";
import "./managecategory.css";
import Layout from "../../components/layout/Layout";
import CategoryDatatable from "../../components/dataTable/CategoryDatatable";
// import {Link} from "react-router-dom"
import { Row, Col } from "react-bootstrap";
const OrderList = () => {
  return (
    <div>
      <Layout>
        <div className="category__header">
          <Row>
            <Col>
              <h2>Manage Category</h2>
            </Col>
            <Col>
              add Category
            </Col>
          </Row>
        </div>
        <CategoryDatatable />
      </Layout>
    </div>
  );
};

export default OrderList;
