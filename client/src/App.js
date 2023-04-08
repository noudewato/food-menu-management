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
import Menu from "./pages/menu/Menu";
import Register from "./pages/auth/Register";
import RegisterUser from "./pages/register/RegisterUser";
import EditProductForm from "./components/product-form/EditProductForm";
import NewProductForm from "./components/product-form/NewProductForm";
import Cart from "./pages/cart/Cart";
import DeliverAddress from "./pages/deliverAddress/DeliverAddress";
import PaymentMethod from "./components/paymentMethod/PaymentMethod";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import OrderList from "./pages/manageorder/OrderList";
import OrderPage from "./pages/manageorder/OrderPage";


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
          <Route path="/login" element={<Login />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manage-category" element={<ManageCategory />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route path="/manage-order" element={<OrderList />} />
          <Route path="/orderDetails/:id" element={<OrderPage />} />
          <Route path="/manage-product/:id" element={<ManageProduct />} />
          <Route path="/admin/manage-user" element={<ManageUser />} />
          <Route path="/admin/add-product/" element={<NewProductForm />} />
          <Route path="/admin/edit-product/:id" element={<EditProductForm />} />
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
