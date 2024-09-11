import axios from "axios";
import { useEffect, useState } from "react";
import { Base_Img_Url, User_URls } from "../../../../constants/End_Points";
import ImgNavbar from "../../../../assets/nav-icon.png";
import Alret from "../../../../assets/alret.png";
import User from "../../../../assets/User.png";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

interface NavbarProps {
  toggle: () => void;
}
export default function Navbar({ toggle }: NavbarProps) {
  const navigate = useNavigate();
  interface user {
    imagePath: string;
    userName: string;
    email: string;
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
        <div className="col-md-9 border-end  navbar-left my-2 ps-2 ">
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

        <div className="col-md-2 navbar-right d-flex bg-white  mt-2">
          <div>
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
              className="nav-link toggle bg-white"
              variant="success"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className=" fw-bold"
                onClick={() => {
                  navigate("/auth/change-password");
                }}
              >
                <i className="fa-solid fa-unlock"></i> ChangePassword
              </Dropdown.Item>
              <Dropdown.Item
                className=" fw-bold"
                onClick={() => {
                  toggle();
                }}
              >
                <MdDarkMode /> dark / <CiLight /> light
              </Dropdown.Item>
              <Dropdown.Item
                className=" fw-bold"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth/login");
                }}
              >
                <i className="fa-solid fa-door-open"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
