const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      uppercase: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
      uppercase: true,
    },
    category: {
      type: String,
      required: true,
      uppercase: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
