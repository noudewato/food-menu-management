const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    deliverAddress,
    paymentMethod,
    itemsPrice,
    deliverPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lenght === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      deliverAddress,
      paymentMethod,
      itemsPrice,
      deliverPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201);
    res.json({  success: true, message: "Order Created Successfully", createdOrder});
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
});

 const updateOrderToDelivered = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id);
   if (order) {
     order.isDelivered = true;
     order.deliveredAt = Date.now();
     const updatedOrder = await order.save();
     res.json(updatedOrder);
   } else {
     res.status(404);
     throw new Error("Order Not found");
   }
 });

 const GetMyOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({ user: req.user._id });
   res.json(orders);
 });

 const GetOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({}).populate("user", "id name email").sort({createdAt: -1});
   res.json({ success:true, orders});
 });

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  GetMyOrders,
  GetOrders,
  updateOrderToDelivered,
};
