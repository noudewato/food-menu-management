import React, { useState } from "react";
import "./productcard.css";
import AOS from 'aos'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToCart } from "../../actions/cartActions"
import { useDispatch } from "react-redux";

const Products = ({ item }) => {
  const dispatch = useDispatch()

  const shortText = (text, n) => {
    if (text.length > n) {
      const shortedText = text.slice(0, n).concat("...")
      return shortedText
    }
    return text
  }
  
  AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 2000, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    anchorPlacement: "top-bottom",
  });

  const [qty, setQty] = useState(1)

  const addToCartHandler = () => {
   dispatch(addToCart(item, qty))
  }

  return (
    <>
      <div className="single__product" data-aos="zoom-in" data-aos-once="true">
        <FavoriteBorderIcon className="fav" />
        <div className="product__image">
          <img
            src={item.image}
            alt=""
            className="w-100 image"

          />
        </div>
        <div className="product__price">
          <span className="currency__sign">
            {item.size?.s}₵{item.prices?.s}
            {item.size?.m}
            {item.prices?.m}
            {item.size?.l}
            {item.prices?.l}
          </span>
          ₵{item.price}
        </div>

        <div className="product__content">
          <div className="product__name">{shortText(item.name, 15)}</div>

          {/* <input
            type="number"
            value={qty ? qty : qty + 1}
            onChange={(e) => setQty(e.target.value)}
            className="product__qty"
          /> */}

          <select value={qty} onChange={(e) => setQty(e.target.value)} className="product__qty">
            {[...Array(10).keys()].map((x, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          {/* <div className="product__description">{item.description}</div> */}
        </div>
        <div className="product__category">{item.category}</div>
        <div className="cart__icon" onClick={addToCartHandler}>
          +
        </div>
      </div>
    </>
  );
};

export default Products;
