import React from "react";
import Logo from "../../../../assets/pms-logo.png";
type FormLayoutProps = {
  title: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  children: React.ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  backgroundImage,

  children,
}) => {
  return (
    <div
      className="form-layout-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-content-center gap-3">
          <div className="logo-form-container text-center">
            <img src={Logo} alt="project management system logo" />
          </div>
          <div className="form-layout-card col-md-6 m-auto">
            <p className="form-layout-description">{description}</p>
            <h2 className="form-layout-title">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
