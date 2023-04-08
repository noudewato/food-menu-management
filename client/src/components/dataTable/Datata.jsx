import React, {useEffect} from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import { getOrderList } from "../../actions/orderActions";

const Datata = () => {

   const dispatch = useDispatch();
   const { orders } = useSelector((state) => state.orderList);
   // console.log(orders);

   useEffect(() => {
     dispatch(getOrderList());
   }, [dispatch]);
   
    
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = orders.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <input
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
    
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

  return (
    <DataTable
      title="Contact List"
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
    />
  );
};

export default Datata;

 
