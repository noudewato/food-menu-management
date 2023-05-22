import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CategoryIcon from "@mui/icons-material/Category";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import ManageAccountsOutlined from "@mui/icons-material/ManageAccountsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Sidebar = () => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">MyResto Food </div>
      </div>
      <div className="center">
        <ul>
          <li>
            <Link to="/admin-dashboard">
              <DashboardIcon className="icon" />
              <div className="menu__link">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to="/manage-category">
              <CategoryIcon className="icon" />
              <div className="menu__link">Category</div>
            </Link>
          </li>
          
          <li>
            <Link to="/manage-product">
              <StoreOutlinedIcon className="icon" />
              <div className="menu__link">Product</div>
            </Link>
          </li>
          
          <li>
            <Link to="/manage-order">
              <ManageAccountsOutlined className="icon" />
              <div className="menu__link">Orders</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-user">
              <AccountCircleOutlinedIcon className="icon" />
              <div className="menu__link">Users</div>
            </Link>
          </li>

          <li>
            <Link>
              <ManageAccountsOutlinedIcon className="icon" />
              <div onClick={onLogout} className="menu__link">
                Logout
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};
export default Sidebar;
