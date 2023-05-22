import React, { useEffect, useState } from "react";
import "./datatable.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listAdminProducts, deleteProduct } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import moment from "moment";
// import EditProductForm from "../product-form/EditProduct";
// import NewEditProduct from "../product-form/NewEditProduct";

const DataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productListAdmin = useSelector((state) => state.productListAdmin);

  const { loading, error, products } = productListAdmin;

  console.log(products);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate("/login");
    }

    dispatch(listAdminProducts());
  }, [userInfo, navigate, dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteProduct(id));
    }
  };

  const actionColumn = [
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/edit-product/${params.row._id}`}>
              <Button variant="light" className="btn-sm mx-1">
                <i class="ri-eye-line"></i>
              </Button>
            </Link>
            <Link to={`/admin/edit-product/${params.row._id}`}>
              <Button variant="success" className="btn-sm me-1">
                <i class="ri-edit-line"></i>
              </Button>
            </Link>
            <Button
              variant="danger"
              className="btn-sm me-1"
              onClick={() => deleteHandler(params.row._id)}
            >
              <i class="ri-delete-bin-line"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable">
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Box sx={{ height: 630, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row._id}
          />
        </Box>
      )}
    </div>
  );
};

export default DataTable;

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 70,
    editable: true,
    renderCell: (params) => <Avatar src={params.row.image} />,
  },
  {
    field: "name",
    headerName: "Name",
    editable: true,
    hide: false,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price",
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "createdAt",
    editable: false,
    filtereable: false,
    renderCell: (params) =>
      moment(params.row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
  },
  {
    field: "updatedAt",
    headerName: "updatedAt",
    editable: false,
    filtereable: false,
    renderCell: (params) =>
      moment(params.row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
  },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];
