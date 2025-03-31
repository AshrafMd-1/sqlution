import "./../styles/navbarPage/NavbarPage.css";
import {SiMicroeditor} from "react-icons/si";
import {MdOutlineSchema} from "react-icons/md";
import {LuSquareTerminal} from "react-icons/lu";
import {FaTableList} from "react-icons/fa6";
import {Outlet} from "react-router";
import Sidebar from "../components/Sidebar.tsx";
import NavbarSidebarMenu from "../components/NavbarSidebarMenu.tsx";
import useSidebarStore from "../store/useSidebarStore.ts";
import Clock from "../components/Clock.tsx";

const NavbarPage = () => {
  const {isOpen, toggleSidebar, openSidebar} = useSidebarStore();

  return (
      <div className="navbar">
        <nav className="navbar-top">
          <div className="navbar-logo">
            <SiMicroeditor className="logo"/>
            <span className="navbar-title">Sqlution</span>
          </div>
          <Clock/>
        </nav>
        <div className="main-body">
          <div className="navbar-sidebar">
            <NavbarSidebarMenu
                isOpen={isOpen}
                url={["sql", "table", "schema"]}
                iconElements={[
                  <LuSquareTerminal/>,
                  <FaTableList/>,
                  <MdOutlineSchema/>,
                ]}
                toggleSidebar={() => {
                  toggleSidebar();
                }}
                openSidebar={() => {
                  openSidebar();
                }}
            />
            <Sidebar isOpen={isOpen}/>
          </div>

          <Outlet/>
        </div>
      </div>
  );
};

export default NavbarPage;
