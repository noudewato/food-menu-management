import React, { useMemo, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import "./datatable.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listAdminCategories, deleteCategory } from "../../actions/categoryActions";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Avatar } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import moment from "moment";

export const CategoryDatatable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);

  const { loading, error, categories } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = categoryDelete;

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listAdminCategories());
    } else {
      navigate("/login");
    }

    
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (successDelete) {
      dispatch(listAdminCategories);
    }
  }, [dispatch, successDelete])

  const columns = useMemo(
    () => [
      {
        accessorKey: "image", //access nested data with dot notation
        header: "Image",
        size: 100,
        Cell: ({ row }) => (
          <div>
            <Avatar src={row.original.image} alt={row.original.name} />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        size: 150,
        Cell: (row) => moment(row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
      },
      {
        accessorKey: "user.name",
        header: "Created By",
        size: 100,
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
            data={categories}
            enableColumnActions={false}
            enableColumnFilters={false}
            enableSorting={false}
            enableBottomToolbar={true}
            //   enableTopToolbar={false}
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
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "4px" }}>
                <IconButton
                  color="primary"
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="success">
                  <Link
                    className="text-success"
                    to={`/admin/edit-category/${row.original._id}`}
                  >
                    <EditIcon />
                  </Link>
                </IconButton>
                <IconButton
                  color="error"
                  onClick={()=>dispatch(deleteCategory(row.original._id))}
                >
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

export default CategoryDatatable;
