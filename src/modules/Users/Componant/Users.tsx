import { useEffect, useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import axios from "axios";
import { User_URls } from "../../../constants/End_Points";
import NoData from "../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [nameValue, setNameValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [arrayOffPages, setArrayOffPages] = useState<any>([]);

  let getAllUsers = async (
    pageS?: number,
    pageN?: number,
    nameInput?: string,
    status?: string
  ) => {
    try {
      let response = await axios.get(User_URls.getUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          pageSize: pageS,
          pageNumber: pageN,
          userName: nameInput,
          isActivated: status,
        },
      });

      setUserList(response.data.data);
      setArrayOffPages(
        Array.from(
          { length: response.data.totalNumberOfPages },
          (_, i) => i + 1
        )
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  let getToggle = async (id: string) => {
    try {
      let response = await axios.put(
        User_URls.toggleStatues(id),
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      if (response.data.isActivated) {
        toast.success("Activation done");
      } else {
        toast.warning("Deactivation done");
      }
      getAllUsers(8, 1, "", statusFilter);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllUsers(10, 1, "", statusFilter);
  }, []);

  const getNameValue = (input: any) => {
    setNameValue(input.target.value);
    getAllUsers(10, 1, input.target.value, statusFilter);
  };

  const getstatusValue = (input: any) => {
    setStatusFilter(input.target.value);
    getAllUsers(10, 1, nameValue, input.target.value);
  };
  return (
    <>
      <h2 className="title-components ps-5 py-4 bg-white mb-5">User</h2>

      <div className="mx-5 mb-5 pt-1 rounded-2 bg-white">
        <div className="mb-3 ms-3 mt-4 pt-2 d-flex ">
          <div className="col-md-3 me-3 mb-1">
            <div className="input-group border-1 mb-2  p-1 border rounded-pill">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control inputForm gray"
                placeholder="Search by name"
                onChange={getNameValue}
              />
            </div>
          </div>

          {/* <div className=".col-md-2 pe-2">
            <select
              onChange={getstatusValue}
              className=" text-black border  rounded-pill py-2 px-2 "
            >
              <option value=""> Filter</option>
              <option value="true">Active</option>
              <option value="false">Not Active</option>
            </select>
          </div> */}
        </div>
        {userList.length > 0 ? (
          <div>
            <table className="table border-bottom mb-3 col-md-11">
              <thead>
                <tr className="text-white text-start ">
                  <th scope="col-2 " className="ms-3">
                    {" "}
                    User Name <HiChevronUpDown />{" "}
                  </th>
                  <th scope="col">
                    Statues <HiChevronUpDown />
                  </th>
                  <th scope="col">
                    Phone Number <HiChevronUpDown />
                  </th>
                  <th scope="col-2">
                    Email <HiChevronUpDown />
                  </th>
                  <th scope="col">
                    Action <HiChevronUpDown />
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user: any) => (
                  <tr key={user?.id}>
                    <td>{user?.userName}</td>
                    <td>
                      {user?.isActivated ? (
                        <span className="btn btn-hover btn-success rounded-pill fixed-w ">
                          Active
                        </span>
                      ) : (
                        <span className="btn btn-hover btn-danger rounded-pill fixed-w">
                          Not Active
                        </span>
                      )}
                    </td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user?.isActivated ? (
                        <i
                          className="fa fa-toggle-on fa-3x text-success"
                          onClick={() => getToggle(user.id)}
                        ></i>
                      ) : (
                        <i
                          className="fa  fa-toggle-off fa-3x text-danger"
                          onClick={() => getToggle(user.id)}
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className=" mx-4 col-md-11 ">
              <ul className="pagination justify-content-end pb-3">
                <li className="page-item">
                  <a className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {arrayOffPages.map((pageN: any) => (
                  <li
                    onClick={() => getAllUsers(10, pageN)}
                    className="page-item"
                    key={pageN}
                  >
                    <a className="page-link">
                      {pageN} <span className="sr-only">(current)</span>
                    </a>
                  </li>
                ))}

                <li className="page-item ">
                  <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
