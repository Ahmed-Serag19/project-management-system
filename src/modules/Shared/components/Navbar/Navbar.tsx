import axios from "axios";
import { useEffect, useState } from "react";
import { Base_Img_Url, User_URls } from "../../../../constants/End_Points";
import ImgNavbar from "../../../../assets/nav-icon.png";
import Alret from "../../../../assets/alret.png";
import User from "../../../../assets/User.svg.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  interface user {
    imagePath: string;
    userName: string;
    email: string;
    Navbar: any;
  }

  const [UserData, setUserData] = useState<user>();

  let getUser = async () => {
    try {
      let response = await axios.get(User_URls.getCurrentUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="border-bottom ">
      <div className="d-flex">
        <div className="col-md-9 border-end my-2 ms-1">
          <div className="d-flex justify-content-between p-1">
            <div className="col-md-9 sideLeft-Navbar">
              <img
                src={ImgNavbar}
                alt=""
                className="ImgNavbar"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </div>

            <div className="p-1 text-end">
              <img src={Alret} alt="" />
            </div>
          </div>
        </div>

        <div className="col-md-2 d-flex ms-2 mt-2">
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <button
              className="navbar-toggler mb-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item ">
                  {UserData?.imagePath !== null ? (
                    <img
                      src={`${Base_Img_Url}/${UserData?.imagePath}`}
                      alt=""
                      className="rounded-circle img-user  mx-2"
                    />
                  ) : (
                    <img
                      src={User}
                      alt=""
                      className="rounded-circle img-user border mx-2"
                    />
                  )}
                </li>
                <li className="nav-item">
                  <p className="mb-0 pb-0">{UserData?.userName}</p>
                  <p className=" my-0 py-0 light-text">{UserData?.email}</p>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></a>

                  <div
                    className="dropdown-menu p-2"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link
                      className="dropdown-item fw-bold"
                      to={"/auth/change-password"}
                    >
                      <i className="fa-solid fa-unlock"></i> ChangePassword
                    </Link>

                    <Link
                      className="dropdown-item fw-bold"
                      to={"/auth/login"}
                      onClick={() => {
                        localStorage.removeItem("token");
                      }}
                    >
                      <i className="fa-solid fa-door-open"></i> Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          {/* <div>
            {UserData?.imagePath !== null ? (
              <img
                src={`${Base_Img_Url}/${UserData?.imagePath}`}
                alt=""
                className="rounded-circle img-user  mx-2"
              />
            ) : (
              <img
                src={User}
                alt=""
                className="rounded-circle img-user border mx-2"
              />
            )}
          </div>

          <div className="ms-1">
            <p className="mb-0 pb-0">{UserData?.userName}</p>
            <p className="light-text">{UserData?.email}</p>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className=" fw-bold"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth/login");
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
 */}
        </div>
      </div>
    </div>
  );
}
