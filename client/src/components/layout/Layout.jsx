import Sidebar from "../../components/sidebar/Sidebar";
import Topnav from "../../components/topnav/Topnav";
import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="LayoutApp">
      <Sidebar />
      <div className="LayoutAppContainer">
        <Topnav />
        <div className="layoutContent">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
