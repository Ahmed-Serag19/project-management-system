import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { useContext, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import PopupModal from "../PopupModal/PopupModal";

const SidebarComponent: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = authContext as AuthContextType;
  const [isCollapse, setIsCollapse] = useState(() => {
    const storedValue = localStorage.getItem("isCollapse");
    if (!storedValue) return false;

    return JSON.parse(storedValue);
  });

  const togglerCollapse = () => {
    const newCollapseState = !isCollapse;
    setIsCollapse(newCollapseState);
    localStorage.setItem("isCollapse", JSON.stringify(newCollapseState));
  };

  const openLogoutModal = () => {
    setShowModal(true);
  };

  const closeLogoutModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setLoading(false);
      setShowModal(false);
      navigate("/auth/login");
    }, 500);
  };

  return (
    <>
      <div
        className="bg-sidebar"
        style={{ position: "sticky", top: "0", left: "0", height: "100vh" }}
      >
        <Sidebar className="position-relative h-100" collapsed={isCollapse}>
          <div
            onClick={togglerCollapse}
            className="position-absolute btn-side mt-2"
          >
            <span className="ps-1 pe-3 py-2">
              {isCollapse ? (
                <i className="fa-solid collapse-btn fa-chevron-right text-white"></i>
              ) : (
                <i className="fa-solid fa-chevron-left out-btn text-white"></i>
              )}
            </span>
          </div>

          <Menu
            className="h-100"
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
              icon={<IoHomeSharp />}
              component={<NavLink to="/dashboard/home" />}
            >
              Home
            </MenuItem>
            {user?.group.name === "Manager" && (
              <MenuItem
                icon={<FiUsers />}
                component={<NavLink to="/dashboard/Users" />}
              >
                Users
              </MenuItem>
            )}
            <MenuItem
              icon={<GrProjects />}
              component={<NavLink to="/dashboard/projects" />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<FaTasks />}
              component={<NavLink to="/dashboard/tasks" />}
            >
              Tasks
            </MenuItem>
            <MenuItem icon={<FiLogOut />} onClick={openLogoutModal}>
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <PopupModal
        buttonText="Logout"
        bodyText="Are you sure you want to log out?"
        show={showModal}
        handleClose={closeLogoutModal}
        propFunction={handleLogout}
        loading={loading}
        title="Logout Confirmation"
      />
    </>
  );
};

export default SidebarComponent;
