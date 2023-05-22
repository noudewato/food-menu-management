import React from 'react'
import OrderDatatable from '../../components/dataTable/OrderDatatable';
import Layout from '../../components/layout/Layout'
import {Row, Col} from "react-bootstrap"
import "./orderList.css"
const OrderList = () => {
  return (
    <div>
      <Layout>
        <Row className="align-items-center dataTable">
          <Col>
            <h2 className="product__title">Manage Orders</h2>
          </Col>
        </Row>
        <OrderDatatable />
      </Layout>
    </div>
  );
}

export default OrderList
