import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {  NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
// import pmsLogo from '../../../../assets/pms-logo.png';
import { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";

const SidebarComponent: React.FC = () => {
  const navigate = useNavigate();
  const[isCollapse, setIsCollapse] = useState(() => {
    const storedValue = localStorage.getItem("isCollapse");
    if (!storedValue) return false;

    return JSON.parse(storedValue);
  });

  let togglerCollapse = () => {
    const newCollapseState = !isCollapse;
    setIsCollapse(newCollapseState);
    localStorage.setItem("isCollapse", JSON.stringify(newCollapseState));
    // setIsCollapse(!isCollapse);
    // localStorage.setItem("isCollapse", !isCollapse);
  };

  return (
    <>
      <div
        className="bg-sidebar"
        style={{ position:"sticky", top: "0", left: "0", height: "100vh" }}
      >
        <Sidebar className="position-relative h-100" collapsed={isCollapse}>
          <div
            onClick={togglerCollapse}
            className=" position-absolute collapse-btn mt-2 "
          >
            <span className="collapse-btn ps-1 pe-3 py-2 rounded-2">
              {isCollapse ? (
                <i className="fa-solid fa-chevron-right text-white"></i>
              ) : (
                <i className="fa-solid  fa-chevron-left text-white"></i>
              )}
            </span>
          </div>

          <Menu
            className="h-100 overflow-hidden"
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#EF9B284D",
                  color: "#ef9b28",
                },
              },
            }}
          >
            <MenuItem
              className="home-sidebar"
              onClick={togglerCollapse}
              icon={<IoHomeSharp />}
              component={<NavLink to="/dashboard/home" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<FiUsers />}
              component={<NavLink to="/dashboard/Users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<GrProjects />}
              component={<NavLink to="/dashboard/projects" />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<FaTasks />}
              component={<NavLink to="/dashboard/Tasks" />}
            >
              Tasks
            </MenuItem>
            <MenuItem
              icon={<FiLogOut />}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/*
      
      
      
      
      
      
      
      
      
      
      
      
      
      */}
    </>
  );
};

export default SidebarComponent;
