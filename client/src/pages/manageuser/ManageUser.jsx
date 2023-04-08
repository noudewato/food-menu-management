import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserDataTable from "../../components/dataTable/UserDataTable";
import Layout from "../../components/layout/Layout";
import './manageuser.css'


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
          <h2 className="product__title">Manage Users</h2>
        </Col>
        <Col className="text-end">
          <Form>
            <Form.Control placeholder="Search Products..." />
          </Form>
        </Col>
      </Row>
      <UserDataTable/>
    </Layout>
  );
};

export default ManageProduct;
