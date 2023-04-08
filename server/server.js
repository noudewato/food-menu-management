const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const products = require("./data/products");
// const bodyParser = require('body-parser')
const app = express();
dotenv.config();

const connectDB = require("./config/db");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const authRouter = require("./routes/userRoute");
const router = require("./routes/uploadRoute");
const tryRouter = require("./routes/uploadtryRoute");
const orderRouter = require("./routes/orderRoute")
// const errorHandler = require("./middleware/error");

connectDB();
mongoose.set("strictQuery", true);

const Port = process.env.PORT || 5001;

app.listen(Port, console.log(`Server is running on port ${Port}`));

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.use(bodyParser.json({}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", router);
app.use("/api/uploade", tryRouter);
// app.use(errorHandler)

// const __dirname = path.resolve()
const folder = path.resolve();
app.use("/uploads", express.static(path.join(folder, "/uploads")));

// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404)
//   next(error)
// });

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 404 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});
