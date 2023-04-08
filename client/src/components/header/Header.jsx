import React, { useRef } from "react";
import { Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import "./header.css";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navLinks = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Menu",
      path: "/menu",
    },
    {
      display: "About",
      path: "#",
    },
    {
      display: "Service",
      path: "#",
    },
    {
      display: "Contact",
      path: "/contact",
    },
  ];

  const menuRef = useRef();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="header__navigation">
          <div className="header__logo ">
            {/* <Link to="/"> */}
              <h2>
                <span>
                  <i className="ri-restaurant-2-fill"></i>
                </span>
                JK
              </h2>
            {/* </Link> */}
          </div>

          <div className="nav__menu" ref={menuRef}>
            <div className="nav__list__wrapper d-flex align-items-center justify-content-between">
              <span>
                <i className="ri-close-fill" onClick={menuToggle}></i>
              </span>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <Link to={item.path} className="nav__link">
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="icons">
            <SearchIcon className="searchIcon" />
            <Link to="/cart">
              <LocalMallIcon className="cartIcon" />
              <Badge className="pill" bg="danger">
                {cartItems.length}
              </Badge>
            </Link>
            {userInfo ? (
              <RecordVoiceOverIcon className="userIcon"/>
            ) : (
              <Link to="/loginUser">
                <PersonIcon className="userIcon" />
              </Link>
            )}
          </div>

          <div className="mobile__menu" onClick={menuToggle}>
            <span>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
