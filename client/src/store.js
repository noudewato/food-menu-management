import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productListAdminReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducer";
// import { cartReducers } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { createOrderReducer, orderDetailsReducer, orderListReducer, updateOrderStatusReducer } from "./reducers/orderReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListAdminReducer, categoryUpdateReducer } from "./reducers/categoryReducer";

const reducer = combineReducers({
  cart: cartReducer,
  categoryList: categoryListAdminReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderStatus: updateOrderStatusReducer,
  productList: productListReducer,
  productListAdmin: productListAdminReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdated: userUpdateReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : null

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const deliverAddressFromStorage = localStorage.getItem("deliverAddress")
    ? JSON.parse(localStorage.getItem("deliverAddress"))
    : null;

  const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    deliverAddress: deliverAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userLoginFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
