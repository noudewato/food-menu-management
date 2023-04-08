const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments();
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()

  if (products) {
    res.status(201)
    res.json({success:true, products})
  } else {
    res.status(401);
    res.json({ success: true, message:"Products not found", ...keyword });
  }
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const newProduct = new Product(req.body);

  const saveProduct = await newProduct.save();

  if (saveProduct) {
    res
      .status(201)
      .json({ success: "Product Created Successfully", saveProduct });
  } else {
    res.status(404);
    throw new Error("Could not save Product");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.image = image),
      (product.description = description),
      (product.brand = brand),
      (product.category = category),
      (product.price = price),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const productByCategory = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$category",
        products: { $push: "$$ROOT" },
      },
    },
    { $project: { name: "$_id", products: 1, _id: 0 } },
  ]);
  if (products) {
    res.status(201)
      res.json({ success: true, products });
  } else {
    res.status(400)
    throw new Error("Cannot display categories")
  }
})

// const getMyProducts = asyncHandler(async (req, res) => {
//   const qN = req.query.newProduct
//   const qC = req.query.category

//   if (qN) {
//     let products;
//     products = await Product.find().sort({createdAt: -1})
//   }
  
// });

module.exports = {
  getProducts,
  getAdminProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  productByCategory
};
