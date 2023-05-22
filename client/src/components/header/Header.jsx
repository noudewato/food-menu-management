import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "@mui/material/Badge";
import ShopIcon from "@mui/icons-material/Shop";
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import {logout} from "../../actions/userActions"
import "./header.css";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

 const logoutHandler = () => {
   dispatch(logout());
   navigate("/");
 };

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
            <div className="header__icon">
              <Link to="/cart">
                <Badge badgeContent={cartItems.length} color="warning">
                  <ShopIcon color="action" />
                </Badge>
              </Link>
            </div>

            <div className="header__icon">
              {userInfo ? (
                <Avatar src={userInfo.image} alt={userInfo.name} />
              ) : (
                <Link to="/loginUser" className="text-dark">
                  <PersonIcon className="userIcon" />
                </Link>
              )}
            </div>

            <div className="header__icon">
              {userInfo ? (
                <NavDropdown>
                  <LinkContainer to="/user-profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                   Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}
            </div>
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
