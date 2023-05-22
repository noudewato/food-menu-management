import React, { useEffect } from 'react'
import './widgets.css'
import { useSelector, useDispatch } from "react-redux"
import { listAdminProducts } from '../../actions/productActions'
import { listUsers } from '../../actions/userActions'

const Widgets = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listAdminProducts())
    dispatch(listUsers())
  }, [dispatch])

  const userList = useSelector(state => state.userList)
  const { users } = userList
  console.log(users)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
   const productList = useSelector((state) => state.productListAdmin);
   const { products } = productList;
  return (
    <div className="Widgets">
      <div className="single__widgets ">
        <span className="cat">Categories</span>
        <span className="userName">{products?.length}</span>
      </div>

      <div className="single__widgets">
        <span className="product">
          <i class="ri-product-hunt-line"></i>Products
        </span>
        <span className="userName">{products?.length}</span>
      </div>

      <div className="single__widgets"> {" "}
        <span className="user">
          <i class="ri-user-line"></i>Users
        </span>
        <span className="userName">{users?.length}</span>
      </div>
    </div>
  );
}

export default Widgets
