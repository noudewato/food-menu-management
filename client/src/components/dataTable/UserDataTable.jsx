import React, { useEffect, useMemo } from "react";
import "./datatable.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MaterialReactTable from "material-react-table";
import Loader from "../Loader";
import Message from "../Message";
import { listUsers, deleteUser } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Box, Avatar, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import moment from "moment";

const DataTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(users);

  const userDelete = useSelector((state) => state.userDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = userDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    dispatch(listUsers());
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (successDelete) {
      dispatch(listUsers())
    }
  },[dispatch, successDelete])


  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        size: 100,
        Cell: ({ row }) => (
          <Avatar src={row.original.image} alt={row.original.name} />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "isAdmin",
        header: "Admin",
        size: 100,
        Cell: ({ row }) => (
          <div>{row.original.isAdmin ? <>Yes</> : <>No</>}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        size: 150,
        Cell: (row) => moment(row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
      },
    ],
    []
  );

  return (
    <div className="dataTable">
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Box sx={{ height: "auto", width: "100%" }}>
          <MaterialReactTable
            columns={columns}
            data={users}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableSorting={false}
            enableBottomToolbar={true}
            enableDensityToggle={false}
            enableHiding={false}
            enableFullScreenToggle={false}
            muiTableBodyRowProps={{ hover: false }}
            initialState={{
              showGlobalFilter: true,
            }}
            muiSearchTextFieldProps={{
              placeholder: "Search all users",
              sx: { minWidth: "400px" },
              variant: "outlined",
            }}
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "4px" }}>
                <IconButton color="primary">
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="success">
                  <Link
                    className="text-success"
                    to={`/admin/edit-user/${row.original._id}`}
                  >
                    <EditIcon />
                  </Link>
                </IconButton>
                <IconButton color="error" onClick={()=> dispatch(deleteUser(row.original._id))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            positionActionsColumn="last"
          />
        </Box>
      )}
    </div>
  );
};

export default DataTable;
