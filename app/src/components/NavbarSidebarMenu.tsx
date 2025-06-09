import React from "react";
import {useLocation} from "react-router-dom";
import "../styles/navbarPage/NavbarSidebarMenu.css";
import {useNavigate} from "react-router";

interface Props {
  url: string[];
  iconElements: React.ReactNode[];
  toggleSidebar: () => void;
  openSidebar: () => void;
  isOpen: boolean;
}

const NavbarSidebarMenu = ({
                             url,
                             iconElements,
                             isOpen,
                             toggleSidebar,
                             openSidebar,
                           }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
      <div className="navbar-sidebar-menu">
        <ul>
          {iconElements.map((icon, index) => (
              <li
                  key={index}
                  className={
                    location.pathname.includes(url[index])
                        ? isOpen
                            ? "navbar-sidebar-menu-active"
                            : "navbar-sidebar-menu-normal"
                        : "navbar-sidebar-menu-normal"
                  }
                  onClick={() => {
                    if (location.pathname.includes(url[index])) {
                      toggleSidebar();
                    } else {
                      if (!isOpen) {
                        openSidebar();
                      }
                      navigate(url[index]);
                    }
                  }}
              >
                <span className="icon">{icon}</span>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default NavbarSidebarMenu;
