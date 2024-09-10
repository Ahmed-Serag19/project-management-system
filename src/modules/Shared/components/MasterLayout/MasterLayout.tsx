import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import React from "react";

interface MasterLayoutProps {
  toggle: () => void;
  mode: string;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ toggle, mode }) => {
  return (
    <div className={`${mode}`}>
      <div className="w-100 ">
        <Navbar toggle={toggle} />
      </div>
      <div className="d-flex ">
        <SidebarComponent />

        <div className="w-100  ">
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
