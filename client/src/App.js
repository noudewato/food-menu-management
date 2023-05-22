import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Contact from "./pages/contact/Contact";
import HomePage from "./pages/home/HomePage";
import ManageUser from "./pages/manageuser/ManageUser";
import ManageProduct from "./pages/manageproduct/ManageProduct";
import ManageCategory from "./pages/managecategory/ManageCategory";
import Login from './pages/auth/Login'
import LoginUser from "./pages/login/LoginUser";
import UserProfile from "./pages/userprofile/UserProfile";
import Menu from "./pages/menu/Menu";
import Register from "./pages/auth/Register";
import RegisterUser from "./pages/register/RegisterUser";
import EditProduct from "./components/product-form/EditProduct";
import AddProduct from "./components/product-form/AddProduct";
import AddCategory from "./components/category-form/AddCategory";
import EditCategory from "./components/category-form/EditCategory";
import Cart from "./pages/cart/Cart";
import DeliverAddress from "./pages/deliverAddress/DeliverAddress";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import OrderList from "./pages/manageorder/OrderList";
import OrderPage from "./pages/manageorder/OrderPage";
import OrderTrack from "./pages/manageorder/orderTrack/OrderTrack";
import EditUser from "./components/user-form/EditUser";


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/deliverAddress" element={<DeliverAddress />} />
          <Route path="/paymentMethod" element={<PaymentMethod />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/trackOrder/:id" element={<OrderTrack />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
          <Route path="/manage-category" element={<ManageCategory />} />
          <Route path="/admin/add-category/" element={<AddCategory />} />
          <Route path="/admin/edit-category/:id" element={<EditCategory />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route path="/manage-order" element={<OrderList />} />
          <Route path="/orderDetails/:id" element={<OrderPage />} />
          <Route path="/manage-product/:id" element={<ManageProduct />} />
          <Route path="/admin/manage-user" element={<ManageUser />} />
          <Route path="/admin/add-product/" element={<AddProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route
            path="manage-product/:pageNumber"
            element={<ManageProduct />}
          />
          <Route path="/menu/page/:pageNumber" element={<Menu />} />
          <Route path="/menu/search/:keyword" element={<Menu />} />
          <Route
            path="/menu/search/:keyword/page/:pageNumber"
            element={<Menu />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
