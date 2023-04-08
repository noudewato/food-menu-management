const express = require("express");
const productRouter = express.Router();

const {
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  getAdminProducts,
  productByCategory,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter.route("/cat").get(productByCategory)
productRouter.route("/adminProducts").get(getAdminProducts);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = productRouter;
