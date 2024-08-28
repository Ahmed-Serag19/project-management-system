import { Link } from "react-router-dom";
import Logo from '../../../../assets/landing-page-logo.png';

const NotFound = () => {
  return (
    <section className="d-flex justify-content-center align-items-center landing-page flex-column">
      <div className="logo-container ">
        <img
          width={400}
          src={Logo}
          alt="project management system logo"
        />
      </div>
      <div className="landing-page-text d-flex flex-column text-center">
        <h4 className='text-success'>Oops! Page not found.</h4>
        <p className="text-white">This Page doesn’t exist or was removed!<br /> We suggest you  back to home.</p>
        <Link to={'/dashboard'} className='btn btn-success'>Back to home</Link>
      </div>
    </section>
  );
};

export default NotFound;
