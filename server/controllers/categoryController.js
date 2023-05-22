const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const newCategory = new Category(req.body);

  const saveCategory = await newCategory.save();

  if (saveCategory) {
    res
      .status(201)
      .json(saveCategory);
  } else {
    res.status(404);
    throw new Error("Could not save Product, Try again");
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  const allCategory = await Category.find().sort({name:"ascending"}).populate("user", "name");

  if (allCategory) {
    res.status(200).json(allCategory);
  } else {
    res.status(404);
    throw new Error("Categories not found");
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    (category.name = name),
      (category.description = description),
      (category.image = image);

    await category.save();
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("Category update failed");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("delete failed");
  }
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
