import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

const MasterLayout = ({toggle, mode}) => {
  return (
    <div className={`${mode}`}>
      <div className='w-100 '>
      <Navbar toggle={toggle} />
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
