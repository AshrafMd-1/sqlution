import "./../styles/navbarPage/NavbarPage.css";
import { SiMicroeditor } from "react-icons/si";
import { useTheme } from "../context/ThemeContext.tsx";
import { MdDarkMode, MdLightMode, MdOutlineSchema } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { GoRepoTemplate } from "react-icons/go";
import { LuSquareTerminal } from "react-icons/lu";
import { FaTableList } from "react-icons/fa6";
import { Outlet } from "react-router";
import Sidebar from "../components/sidebar.tsx";
import NavbarSidebarMenu from "../components/NavbarSidebarMenu.tsx";
import { useState } from "react";

const NavbarPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <div className="navbar">
      <nav className="navbar-top">
        <div className="navbar-logo">
          <SiMicroeditor className="logo" />
          <span className="navbar-title">SQUEAL</span>
        </div>
        <div className="navbar-actions">
          <ul>
            <li
              onClick={() => {
                toggleTheme();
              }}
            >
              {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
            </li>
            <li>
              <FaRobot />
            </li>
            <li>
              <GoRepoTemplate />
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-body">
        <div className="navbar-sidebar">
          <NavbarSidebarMenu
            open={open}
            url={["sql", "table", "schema"]}
            iconElements={[
              <LuSquareTerminal />,
              <FaTableList />,
              <MdOutlineSchema />,
            ]}
            isOpen={() => {
              setOpen(!open);
            }}
          />
          <Sidebar isOpen={open} />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default NavbarPage;
