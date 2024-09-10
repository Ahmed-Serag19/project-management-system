import React, { useState, useEffect, useContext } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "./CustomToggle";
import { Task_URLs } from "../../../constants/End_Points";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import NoData from "../../Shared/components/NoData/NoData";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsPencilSquare, BsTrash } from "react-icons/bs";
import PopupModal from "../../Shared/components/PopupModal/PopupModal";
import { GoPlus } from "react-icons/go";
import TaskUser from "./TaskUser/TaskUser";

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
  const [userLoading, setUserLoading] = useState<boolean>(true); // New state for user loading
  const [titleValue, setTitleValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { getAllForManager, getAllAssigned, delete: deleteTask } = Task_URLs;
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { user } = authContext as AuthContextType;
  let navigate = useNavigate();

  // Fetch user state on initial load
  useEffect(() => {
    if (user === null) {
      setUserLoading(true);
    } else {
      setUserLoading(false);
    }
  }, [user]);

  // Determine which endpoint to use based on the user's group
  const fetchTasks = async (pageN: number = 1) => {
    setLoading(true);
    const apiEndpoint =
      user?.group.name === "Manager" ? getAllForManager : getAllAssigned;

    try {
      const response = await axiosInstance.get(apiEndpoint, {
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

  const handleDeleteTask = async () => {
    if (selectedTaskId === null) return;

    setDeleting(true);
    try {
      await axiosInstance.delete(deleteTask(selectedTaskId));
      toast.success("Task deleted successfully");
      fetchTasks(pageNumber);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete task", error);
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (taskId: number) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedTaskId(null);
  };

  // Fetch tasks when the component mounts and when filters change
  useEffect(() => {
    if (!userLoading && user) {
      fetchTasks(pageNumber);
    }
  }, [titleValue, statusValue, user, userLoading]);

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

  if (userLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="title-components tasks-header ps-5 py-4 bg-white mb-5">
        <div className="d-flex justify-content-between">
          <h2 className="">Tasks</h2>
          {user?.group.name === "Manager" && (
            <button
              className="btn btn-lg btn-warning me-5 btn-add text-white rounded-pill px-3"
              onClick={() => {
                navigate("/dashboard/add-task");
              }}
            >
              <GoPlus className="me-2" />
              Add New Task
            </button>
          )}
        </div>

        <Link to=""></Link>
      </div>
      {user?.group.name === "Manager" ? (
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
              <table className="table border-bottom col-md-11">
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
                      <td>{task?.title}</td>
                      <td>{task?.status}</td>
                      <td>{task?.employee?.userName}</td>
                      <td>{task?.project?.title}</td>
                      <td>
                        {new Date(task.creationDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} />
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              <BsEye className="me-2" /> View
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                navigate("/dashboard/add-task", {
                                  state: { task },
                                })
                              }
                            >
                              <BsPencilSquare className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => openDeleteModal(task.id)}
                            >
                              <BsTrash className="me-2" /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {loading && (
                <div className="loading-overlay d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              <div className="pb-1 my-2 me-4">{renderPagination()}</div>
            </div>
          )}
        </div>
      ) : (
        <TaskUser />
      )}

      <PopupModal
        buttonText="Delete"
        bodyText="Are you sure you want to delete this task?"
        show={showModal}
        handleClose={closeDeleteModal}
        propFunction={handleDeleteTask}
        loading={deleting}
        title="Delete Task Confirmation"
      />
    </>
  );
};

export default Tasks;
