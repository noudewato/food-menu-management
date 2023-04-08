const express = require("express");
const authRouter = express.Router();
const {loginUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, updateUser, getUserByID} = require('../controllers/userController')
const { protect, admin } = require("../middleware/authMiddleware");
authRouter.post(
  "/login", loginUser
);

authRouter.route('/profile').get(protect, getUserProfile)
authRouter.route("/udpdateUserProfile").put(protect, updateUserProfile);
authRouter.route('/').post(registerUser);
authRouter.route("/").get(protect, admin, getUsers);
authRouter
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

module.exports = authRouter;
