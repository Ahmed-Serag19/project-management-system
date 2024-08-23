import { Link } from 'react-router-dom';
import Logo from '../../../../assets/landing-page-logo.png';

const LandingPage = () => {
  return (
    <section className="d-flex justify-content-center align-items-center landing-page flex-column ">
      <div className="logo-container ">
        <img
          src={Logo}
          alt="project management system logo"
          className=""
        />
      </div>
      <div className="landing-page-text d-flex gap-4">
        <Link to="auth/login">Login</Link>
        <Link to="auth/register">Register</Link>
      </div>
    </section>
  );
};

export default LandingPage;
