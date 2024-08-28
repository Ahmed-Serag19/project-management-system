import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SidebarComponent from '../SidebarComponent/SidebarComponent';

const MasterLayout = () => {
  return (
    <div>
      <div className='w-100'>
      <Navbar />
      </div>
      <div className="d-flex gap-3 ">
        <div className="side">
          <div className="side-bar-container">
            <SidebarComponent />
          </div>
        </div>

        <div className="w-100 px-3 py-4">
          
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
