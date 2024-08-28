import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
// import pmsLogo from '../../../../assets/pms-logo.png';
import { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";

const SidebarComponent: React.FC = () => {
  const navigate = useNavigate();
  const [iscollapse, setIscollapse] = useState(false);
  const handleToggle = () => {
    setIscollapse(!iscollapse);
  };

  return (
    <>
      <Sidebar collapsed={iscollapse}>
        <Menu>
          <MenuItem
            onClick={handleToggle}
            icon={<IoHomeSharp />}
            component={<Link to="/dashboard/home" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<FiUsers />}
            component={<Link to="/dashboard/Users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<GrProjects />}
            component={<Link to="/dashboard/projects" />}
          >
            Projects
          </MenuItem>
          <MenuItem
            icon={<FaTasks />}
            component={<Link to="/dashboard/Tasks" />}
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
    </>
  );
};

export default SidebarComponent;
