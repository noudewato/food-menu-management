import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../product-card/Products";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../../actions/productActions";
import Paginate from "../paginate/Paginate";
import "./allproducts.css";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch,keyword, pageNumber]);

  return (
    <div className="AllProduct mt-5">
      <Row>
        {products.map((item) => (
          <Col lg={3} xl={3} md={6} sm={12} xs={12} key={item._id}>
            <Products item={item} />
          </Col>
        ))}
      </Row>
      <div className="pagination__content">
        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
      </div>
    </div>
  );
};

export default AllProduct;
