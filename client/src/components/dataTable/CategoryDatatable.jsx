import React, { useEffect, useState, useMemo } from "react";
import "./datatable.css";
import { listAdminCategories } from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialReactTable from "material-react-table";

const CategoryDatatable = () => {
  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector(
    (state) => state.categoryList
  );
  console.log(categories);

  const columns = useMemo(
    () => [
      {
        header: "_id",
        accessorKey: "_id", //simple accessorKey pointing to flat data
      },
      {
        header: "name",
        accessorKey: "name", //simple accessorKey pointing to flat data
      },

      {
        header: "description",
        accessorKey: "description", //simple accessorKey pointing to flat data
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(listAdminCategories());
  }, [dispatch]);
  return (
    <div className="dataTable">
      <MaterialReactTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryDatatable;
