import React, { useEffect, useState } from "react";
import "./datatable.css";
import { getOrderList } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Loader from "../Loader";
import Message from "../Message";
import { Box, Input } from "@mui/material";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderDatatable = () => {
  const columns = [
    {
      name: "id",
      selector: (row) => row._id.substring(0, 6),
    },
    // {
    //   name: "image",
    //   cell: (row) => (
    //     <div>
    //       <img src={row.orderItems[0].image} alt={row.orderItems[0].name} />
    //     </div>
    //   ),
    // },
    {
      name: "User",
      selector: (row) => row.user?.name,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt.substring(0, 10),
    },
    {
      name: "Total",
      selector: (row) => <p># {row.totalPrice}</p>,
    },
    {
      name: "Paid",
      selector: (row) => (
        <p>
          {row.isPaid ? (
            <Badge className="success">{row.paidAt.substring(0, 10)}</Badge>
          ) : (
            <Badge className="bg-danger">No</Badge>
          )}
        </p>
      ),
    },
    {
      name: "Delivered",
      selector: (row) => (
        <p>
          {row.isDelivered ? (
            <Badge className="bg-success">
              {row.deliveredAt.substring(0, 10)}
            </Badge>
          ) : (
            <Badge className="bg-danger">No</Badge>
          )}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/orderDetails/${row._id}`}>
          <Button> Details </Button>
        </Link>
      ),
    },
  ];
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orderList);
  // console.log(orders);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const [records, setRecords] = useState(orders)

  const filterHandler = (e) => {
    const newData = orders.filter(row => { return row.user?.name.toLowerCase().includes(e.target.value.toLowerCase()); })
    setRecords(newData)
  }

  return (
    <div className="orderDataTable">
      {/* <div className="dataTable">
        <Row>
          <Col>Manage Orders</Col>
          <Col>
            <input
              className="textSearch"
              type="text"
              onChange={filterHandler}
              placeholder="type to search"
            />
          </Col>
        </Row>
      </div> */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="dataTable">
          <Box sx={{ height: 750, width: "100%" }}>
            <DataTable
              title="Manage Orders"
              columns={columns}
              data={records}
              striped={true}
              actions={
                <div>
                  <Button>Add New</Button>
                  <Button>export</Button>
                  <Button>Print</Button>
                </div>
              }
              pagination
              subHeader
              subHeaderComponent={
                <input className="w-50" type="text" onChange={filterHandler} />
              }
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default OrderDatatable;
