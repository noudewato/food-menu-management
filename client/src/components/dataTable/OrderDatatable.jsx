import React, { useEffect, useMemo } from "react";
import "./datatable.css";
import { getOrderList } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialReactTable from "material-react-table";
import Loader from "../Loader";
import Message from "../Message";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const OrderDatatable = () => {

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id", //access nested data with dot notation
        header: "Order No.",
        size: 100,
        Cell: ({ row }) => (
          <>
            {row.original.status === 1 ? (
              <div className="underline">
                {row.original._id.substring(0, 9)}
              </div>
            ) : (
              <div>{row.original._id.substring(0, 9)}</div>
            )}
          </>
        ),
      },
      {
        accessorKey: "user.name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "totalPrice",
        header: "Amount",
        size: 50,
        Cell: ({ row }) => (
          <div>
            <span> ₵</span>
            {row.original.totalPrice}
          </div>
        ),
      },
      {
        accessorKey: "paid",
        header: "Paid",
        size: 50,
        Cell: ({ row }) => (
          <>
            {row.original.isPaid ? (
              <div style={{ color: "lightgreen", fontWeight: "bolder" }}>
                Paid
              </div>
            ) : (
              <div style={{ color: "red" }}>No</div>
            )}
          </>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Order Date",
        size: 150,
        Cell: (row) => moment(row.createdAt).format("YYYY-MM-DD/HH-MM-SS"),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
        Cell: ({ row }) => (
          <>
            {row.original.status === 0 ? (
              <div style={{ color: "orange", fontWeight: "bolder" }}>
                Pending...
              </div>
            ) : row.original.status === 1 ? (
              <div style={{ color: "yellow" }}>Preparing...</div>
            ) : row.original.status === 2 ? (
              <div style={{ color: "tomato" }}>Ready...</div>
            ) : (
              <div style={{ color: "red" }}>isDelivered.</div>
            )}
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    []
  );
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orderList);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);
  return (
    <div className="orderDataTable">

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="dataTable">
          <Box sx={{ height: "auto", width: "100%" }}>
            <MaterialReactTable
              columns={columns}
              data={orders}
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
                placeholder: "Search all orders",
                sx: { minWidth: "400px" },
                variant: "outlined",
              }}
              enableRowActions
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "4px" }}>
                  <IconButton color="primary">
                    <Link
                      className="text-primary"
                      to={`/orderDetails/${row.original._id}`}
                    >
                      Details
                    </Link>
                  </IconButton>
                </Box>
              )}
              positionActionsColumn="last"
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default OrderDatatable;
