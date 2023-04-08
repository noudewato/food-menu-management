const express = require("express")
const { createCategory, getAllCategory, updateCategory, deleteCategory, getCategoryById } = require("../controllers/categoryController")
const categoryRouter = express.Router()
const { protect, admin } = require("../middleware/authMiddleware");

categoryRouter.route("/").post(protect, createCategory).get(getAllCategory)
categoryRouter.route("/:id").get(protect,admin,getCategoryById).put(protect, updateCategory).delete(protect, admin, deleteCategory);

module.exports = categoryRouter;