import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { Project_URLs, requestHeader } from "../../../constants/End_Points";
import { useNavigate } from "react-router-dom";
import NoData from "../../Shared/components/NoData/NoData";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../Tasks/Componant/CustomToggle";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

interface Project {
  id: number;
  description: string;
  title: string;
  task: object[];
}

export default function Projects() {
  const Navigator = useNavigate();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const getAllProjects = async () => {
    try {
      const res = await axios.get(`${Project_URLs.getProjectForMang}`, {
        headers: requestHeader,
      });
      console.log(res?.data?.data);
      setProjectList(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      <div className="bg-white mt-1 d-flex justify-content-between align-items-center">
        <h2 className="title-components ps-5 py-4">Projects</h2>
        <button
          className="btn bg-main rounded-5 text-white px-4 me-4"
          onClick={() => Navigator("/dashboard/add-project")}
        >
          + Add New Project
        </button>
      </div>

      <div className="m-5 mt-4 bg-white rounded-3 py-4">
        <InputGroup className="mb-3 ms-4 mt-2 border w-fit rounded-4 text-black">
          <InputGroup.Text id="basic-addon1">
            <IoMdSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search By Title"
            aria-label="Search By Title"
            aria-describedby="basic-addon1"
            className="text-black py-1"
          />
        </InputGroup>

        <div>
          <table className="table">
            <thead>
              <tr className="text-white">
                <th>
                  Title <HiChevronUpDown />
                </th>
                <th>
                  No Of Tasks <HiChevronUpDown />
                </th>
                <th>
                  Description <HiChevronUpDown />
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {projectList.length > 0 ? (
                projectList.map((Project) => {
                  return (
                    <tr key={Project.id}>
                      <td>{Project.title}</td>
                      <td>{Project.task.length}</td>
                      <td>{Project.description}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              <FaEye />
                              <span className="d-inline-block ms-2">View</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <CiEdit />
                              <span className="d-inline-block ms-2">Edit</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <MdDelete />
                              <span className="d-inline-block ms-2">
                                Delete
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <NoData />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
