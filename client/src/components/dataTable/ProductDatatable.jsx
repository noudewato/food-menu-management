import React, { useMemo, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import "./datatable.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listAdminProducts, deleteProduct } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import moment from "moment";

export const ProductDatatable = () => {
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

  useEffect(() => {
    if (successDelete) {
      dispatch(listAdminProducts())
    }
  },[dispatch, successDelete])

  const columns = useMemo(
    () => [
      {
        accessorKey: "image", //access nested data with dot notation
        header: "Image",
        size: 100,
        Cell: ({row}) => (
          <div>
            <Avatar src={row.original.image} alt={row.original.name} />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 50,
        Cell: ({ row }) => (
          <div>
                <span> ₵</span>
                {row.original.price}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        size: 150,
        Cell: (row) => moment(row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
      },
      {
        accessorKey: "user.name",
        header: "CreatedBy",
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
              data={products}
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
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "4px" }}>
                  <IconButton
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="success">
                    <Link className="text-success" to={`/admin/edit-product/${row.original._id}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => dispatch(deleteProduct(row.original._id))}
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

export default ProductDatatable;
