import React, { useEffect } from "react";
import "./datatable.css";
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { listUsers, deleteUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import moment from 'moment'

const DataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(users);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    dispatch(listUsers());
  }, [userInfo, navigate, dispatch]);

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteUser);
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
             <Link to={`/admin/edit-product/${params.row}`}>
               <Button variant="success" className="btn-sm me-1">
                 <i class="ri-edit-line"></i>
               </Button>
             </Link>
             <Button
               variant="danger"
               className="btn-sm me-1"
               onClick={() => deleteHandler(params.row)}
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Box sx={{ height: 630, width: "100%" }}>
          <DataGrid
            rows={users}
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
  // {
  //   field: "image",
  //   headerName: "Image",
  //   width: 70,
  //   editable: true,
  //   renderCell: (params) => <Avatar src={params.row.image} />,
  // },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "createdAt",
    width: 200,
    editable: false,
    filtereable: false,
    renderCell: (params) =>
      moment(params.row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
  },
  {
    field: "updatedAt",
    headerName: "updatedAt",
    width: 200,
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
