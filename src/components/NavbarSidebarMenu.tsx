import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/navbarPage/NavbarSidebarMenu.css";
import { useNavigate } from "react-router";

interface Props {
  url: string[];
  iconElements: React.ReactNode[];
  isOpen: () => void;
  open: boolean;
}

const NavbarSidebarMenu = ({ url, iconElements, isOpen, open }: Props) => {
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
                ? open
                  ? "navbar-sidebar-menu-active"
                  : "navbar-sidebar-menu-normal"
                : "navbar-sidebar-menu-normal"
            }
            onClick={() => {
              if (location.pathname.includes(url[index])) {
                isOpen();
              } else {
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
