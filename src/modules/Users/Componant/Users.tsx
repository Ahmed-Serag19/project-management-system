import { useEffect, useState } from "react";
import styles from './Users.module.css'
import { HiChevronUpDown } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import axios from "axios";
import {  User_URls } from "../../../constants/End_Points";
import NoData from "../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [nameValue, setNameValue] = useState<string>("");
  const [groupValue, setGroupValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); 
  const [arrayOffPages, setArrayOffPages] = useState<any>([]);

  const arrayOfPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const filteredPages = arrayOfPages.filter(
    (pageN) => pageN >= 1 && pageN <= totalPages
  );

  let getAllUsers = async (
    pageS?: number,
    pageN?: number,
    nameInput?: string,
    groupsInput?: number
  ) => {
    try {
      let response = await axios.get(User_URls.getUser, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } ,
        params: {
          pageSize: pageS,
          pageNumber: pageN,
          userName: nameInput,
          groups: groupsInput,
        },
      });
      
      setUserList(response.data.data);
      setArrayOffPages(response.data.totalNumberOfRecords)
      console.log(response);
    } catch (error:any) {
      console.log(error);
         toast.error(error?.response?.data?.message)
     
    }
  };
  let getToggle = async (id: string) => {
    try {
      let response = await axios.put(
        User_URls.toggleStatues(id),
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } ,
        }
      );
      console.log(response);
      if (response.data.isActivated) {
        toast.success("Activation done");
      } else {
        toast.warning("Deactivation done");
      }
      getAllUsers(8,1,"", 1);
    } catch (error:any) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getAllUsers(8, currentPage - 1, nameValue, groupValue);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      getAllUsers(8, currentPage + 1, nameValue, groupValue);
    }
  };


  //   const pages=(currentPage:number, totalNumberOfPages:any)=>{
  // if (currentPage == arrayOffPages[0]) {
  //   if(currentPage-10<=0){
  //     if(currentPage+11 >= 11){
  //       return range(1,11)
  //     }else{
  //       return range(1,arrayOffPages?.length)
  //     }

  //   }
  //   return range(currentPage -10, currentPage-1)

  // }
  // if (currentPage-10> totalNumberOfPages){
  //   return range (totalNumberOfPages-1,totalNumberOfPages-10) }

  // }
  // return range(currentPage,currentPage+10)

  //   }

  useEffect(() => {
    getAllUsers(8, 1,"", 1);
  }, []);

  const getNameValue = (input: any) => {
    setNameValue(input.target.value);
    getAllUsers(8,1,input.target.value,groupValue);
  };
  const getGroupValue = (input: any) => {
    setGroupValue(input.target.value);
    getAllUsers(8, 1,nameValue,input.target.value);
  };
  const handlePageChange = (event: any) => {
    const selectedPage = parseInt(event.target.value, 10);
    setCurrentPage(selectedPage);
    getAllUsers(8, selectedPage, nameValue, groupValue);
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

              <div className=".col-md-2 pe-2">
                <select
                  onChange={getGroupValue}
                  className=" text-black border  rounded-pill py-2 px-2 "
                >
                  <option value=""> Filter</option>
                  <option value="1">Manager</option>
                  <option value="2">Employee</option>
                </select>
              </div>
            </div>
        {userList.length > 0 ? (
          <div>
       

            <table className="table border-bottom mb-4 col-md-11">
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
                    Date Created <HiChevronUpDown />
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
                        <button className="btn btn-hover btn-success rounded-pill ">
                          Active
                        </button>
                      ) : (
                        <button className="btn btn-hover btn-danger rounded-pill ">
                          Not Active
                        </button>
                      )}
                    </td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.email}</td>
                    <td>{new Date(user?.creationDate).toLocaleDateString()}</td>
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

            <div className="d-flex justify-content-end pb-2 me-4 my-2 dark-gary">
              <p className="mt-2 me-2">Showing </p>
              <div >
                
              <select
                  value={currentPage}
                  onChange={handlePageChange}
                  className="text-secondary border-select border rounded-pill py-2 px-2"
                >
                  {arrayOfPages.map((pageN: number) => (
                    <option key={pageN} value={pageN}>
                      {pageN}
                    </option>
                  ))}
                </select>

              </div>

              <p className="mt-2 mx-3">of {arrayOffPages} Results</p>
              <p className="mt-2 me-3">Page {currentPage} of 10</p>
              <FaChevronLeft  className=" me-3 Chevron" onClick={handlePrevious} />
              <FaChevronRight  className="Chevron" onClick={handleNext}/>

            
            </div>
            {/* <div className="pb-1 my-2 me-4">
              <nav aria-label="Page navigation example ">
                <ul className="pagination  justify-content-end">
                  <li className="page-item">
                    <a className="page-link" aria-label="Previous" onClick={handlePrevious}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>

                  {filteredPages.map((pageN: number) => (
                    <li
                      onChange={() => {
                        setCurrentPage(pageN);
                        getAllUsers(8, pageN)}
                      }
                        
                        
                       
                      
                      className="page-item"
                      key={pageN}
                    >
                      <a className="page-link">{pageN}</a>
                    </li>
                  ))}

                  

                  <li className="page-item">
                    <a  className="page-link" aria-label="Next" onClick={handleNext}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
