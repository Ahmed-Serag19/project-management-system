import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_Img_Url, User_URls } from "../../../../constants/End_Points";
import ImgNavbar from "../../../../assets/nav-icon.png";
import Alret from "../../../../assets/alret.png";
import User from "../../../../assets/User.svg.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
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
    <div className="border-bottom">
      <div className="d-flex">
        <div className="col-md-9 border-end my-2 ms-1">
          <div className="d-flex justify-content-between p-1">
            <div className="col-md-9 sideLeft-Navbar">
              <img src={ImgNavbar} alt="" className="" />
            </div>

            <div className="p-1 text-end">
              <img src={Alret} alt="" />
            </div>
          </div>
        </div>

        <div className="col-md-2 d-flex ms-2 mt-2">
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

 
        </div>
      </div>
    </div>
  );
}
