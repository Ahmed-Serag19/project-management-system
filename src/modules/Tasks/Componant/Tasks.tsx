import React, { useState, useEffect } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "./CustomToggle"; // Adjust the import path as needed
import { Task_URLs } from "../../../constants/End_Points";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import NoData from "../../Shared/components/NoData/NoData";

interface Task {
  id: number;
  title: string;
  status: string;
  creationDate: string;
  project: {
    title: string;
  };
  employee: {
    userName: string;
  };
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [titleValue, setTitleValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10); // Default to 10 items per page
  const [totalPages, setTotalPages] = useState<number>(1);

  const { getAllForManager } = Task_URLs;

  // Fetch tasks based on current pagination and filters
  const fetchTasks = async (pageN: number = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(getAllForManager, {
        params: {
          title: titleValue,
          status: statusValue,
          pageSize: pageSize,
          pageNumber: pageN,
        },
      });

      setTasks(response.data.data || []);
      setTotalPages(response.data.totalNumberOfPages || 1);
      setPageNumber(pageN);
    } catch (error) {
      console.error("Failed to load tasks", error);
      toast.error("Failed to load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(pageNumber);
  }, [titleValue, statusValue]);

  // Update the title filter
  const getTitleValue = (input: any) => {
    setTitleValue(input.target.value);
    fetchTasks(1);
  };

  // Update the status filter
  const getStatusValue = (input: any) => {
    setStatusValue(input.target.value);
    fetchTasks(1);
  };

  // Render pagination as numbered buttons
  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => fetchTasks(pageNumber > 1 ? pageNumber - 1 : 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              onClick={() => fetchTasks(page)}
              className={`page-item ${
                page === pageNumber ? "text-white text-primary" : ""
              }`}
            >
              <a className="page-link">{page}</a>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link"
              aria-label="Next"
              onClick={() =>
                fetchTasks(
                  pageNumber < totalPages ? pageNumber + 1 : totalPages
                )
              }
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <h2 className="title-components ps-5 py-4 bg-white mb-5">Tasks</h2>

      <div className="mx-5 mb-5 pt-1 rounded-2 bg-white">
        <div className="mb-3 ms-3 mt-4 pt-2 d-flex ">
          <div className="col-md-3 me-3 mb-1">
            <div className="input-group border-1 mb-2 p-1 border rounded-pill">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control inputForm gray"
                placeholder="Search by title"
                onChange={getTitleValue}
              />
            </div>
          </div>

          <div className=".col-md-2 pe-2">
            <select
              onChange={getStatusValue}
              className="text-black border rounded-pill py-2 px-2"
            >
              <option value="">Filter by status</option>
              <option value="ToDo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        {tasks.length === 0 ? (
          <NoData />
        ) : (
          <div>
            <table className="table col-md-11">
              <thead>
                <tr className="text-white text-start">
                  <th>
                    Title <HiChevronUpDown />
                  </th>
                  <th>
                    Status <HiChevronUpDown />
                  </th>
                  <th>
                    User <HiChevronUpDown />
                  </th>
                  <th>
                    Project <HiChevronUpDown />
                  </th>
                  <th>
                    Date Created <HiChevronUpDown />
                  </th>
                  <th>
                    Action <HiChevronUpDown />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className={loading ? "opacity-50" : ""}>
                    <td>{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.employee.userName}</td>
                    <td>{task.project.title}</td>
                    <td>{new Date(task.creationDate).toLocaleDateString()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                          <Dropdown.Item href="#">View Task</Dropdown.Item>
                          <Dropdown.Item href="#">Edit Task</Dropdown.Item>
                          <Dropdown.Item href="#">Delete Task</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show a loading overlay on top of the table */}
            {loading && (
              <div className="loading-overlay d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="pb-1 my-2 me-4">{renderPagination()}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
