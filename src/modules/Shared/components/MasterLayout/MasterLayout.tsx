import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

const MasterLayout = () => {
  return (
    <div >
      <div className='w-100 '>
      <Navbar />
      </div>
      <div className="d-flex ">

      <SidebarComponent />


        <div className="w-100  ">  
        
          <div className="" >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
