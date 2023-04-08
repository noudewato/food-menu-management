import React from 'react'
import OrderDatatable from '../../components/dataTable/OrderDatatable';
import Layout from '../../components/layout/Layout'
import "./orderList.css"
const OrderList = () => {
  return (
    <div>
      <Layout><OrderDatatable/></Layout>
    </div>
  );
}

export default OrderList
