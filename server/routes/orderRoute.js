const express = require('express');
const { addOrderItems, GetOrders, GetMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const orderRouter = express.Router()

orderRouter.route('/').post(protect, addOrderItems).get(protect,admin,GetOrders)
orderRouter.route("/myorders").get(protect, GetMyOrders);

orderRouter.route("/:id").get(protect, getOrderById);
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);
orderRouter.route("/:id/status").put(protect, admin, updateOrderStatus);

orderRouter.route("/:id/deliver").put(protect, admin, updateOrderToDelivered); 

module.exports = orderRouter;