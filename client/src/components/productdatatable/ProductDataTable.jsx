import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listProducts, deleteProduct } from "../../actions/productActions";
import Paginate from "../paginate/Paginate";

const ProductDataTable = () => {
  const { pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(products);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Do you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <section>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h2 className="product__title">Products</h2>
          </Col>
          <Col className="m-auto">
            <Form>
              <Form.Control
                placeholder="Search Products..."
              />
            </Form>
          </Col>
          <Col className="text-end">
            <Link to="/admin/add-product">
              <Button className="my-3 product__btn">
                <i class="ri-add-line"></i> Create Product
              </Button>
            </Link>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="product-list-table">
            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm"
              size="sm"
            >
              <thead>
                <tr>
                  <th>Image</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                      <td className="p-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          width="50px"
                          height="50px"
                        />
                      </td>
                      <td className="p-3">{product.name}</td>
                      <td className="product__list__price p-3">
                        ₵
                        <span className="product__list__price">
                          {product.price}
                        </span>
                      </td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">{product.brand}</td>
                      <td className="py-3">
                        <Link to={`/admin/edit-product/${product._id}`}>
                          <Button variant="light" className="btn-sm mx-1">
                            <i class="ri-eye-line"></i>
                          </Button>
                        </Link>
                        <Link to={`/admin/edit-product/${product._id}`}>
                          <Button variant="success" className="btn-sm me-1">
                            <i class="ri-edit-line"></i>
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm me-1"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i class="ri-delete-bin-line"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
                <Paginate page={page} pages={pages} />
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductDataTable;
