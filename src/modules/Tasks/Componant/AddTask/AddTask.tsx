import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Project_URLs,
  Task_URLs,
  User_URls,
} from "../../../../constants/End_Points";
import { useEffect, useState } from "react";

export default function AddTask() {
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);
  let navigate = useNavigate();
  interface dataTask {
    title: string;
    description: string;
    employeeId: number;
    projectId: number;
  }
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<dataTask>({
    defaultValues: { title: "", description: "", employeeId: 0, projectId: 0 },
  });
  let onSubmit = async (data: dataTask) => {
    try {
      let response = await axios.post(Task_URLs.create, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      navigate("/dashboard/tasks");
      toast.success(response.data.message || "Task Add Successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed Add Task");
    }
  };

  let addProject = async () => {
    try {
      let response = await axios.get(Project_URLs.addNewProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      setProjectList(response.data.data);
     
    } catch (error: any) {
 
    }
  };

  let getAllUsers = async () => {
    try {
      let response = await axios.get(User_URls.getUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setUserList(response.data.data);

      console.log(response);
    } catch (error: any) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    addProject();
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="dark-green ps-5 py-4 bg-white">
        <Link
          to={"/dashboard/tasks"}
          className="text-decoration-none text-muted"
        >
          <IoIosArrowBack /> View All Tasks
        </Link>
        <h2 className="mt-2">Add All Tasks</h2>
      </div>
      <div className="my-5 bg-white p-5 rounded-4 shadow w-75 m-auto">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Form.Group controlId="name">
              <Form.Label className="text-muted">Title</Form.Label>
              <InputGroup>
                <Form.Control
                  className="border rounded-4 p-2 text-secondary"
                  type="text"
                  placeholder="Name"
                  {...register("title", {
                    required: "Task Name is required!",
                  })}
                />
              </InputGroup>
            </Form.Group>
            {errors.title?.message && (
              <p className="text-danger mt-1">{errors.title?.message}</p>
            )}
          </div>
          <div className="my-4">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text-muted">Description</Form.Label>
              <Form.Control
                className="border rounded-4 p-2 text-secondary"
                as="textarea"
                placeholder="Description"
                rows={3}
                {...register("description", {
                  required: "Task description is required!",
                })}
              />
            </Form.Group>
            {errors.description?.message && (
              <p className="text-danger mt-1">{errors.description?.message}</p>
            )}
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div>
                <Form.Label className="text-muted ms-1">User</Form.Label>
                <select
                  {...register("employeeId", { required: "User is required" })}
                  className="form-control text-secondary border rounded-4 p-2  select"
                  id=""
                >
                  <option>No Status Selected</option>
                  {userList.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>

                {errors.employeeId?.message && (
                  <p className="text-danger mt-1">
                    {errors.employeeId?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <Form.Label className="text-muted ms-1">Project</Form.Label>
                <select
                  {...register("projectId", {
                    required: "project is required",
                  })}
                  className="form-control text-secondary border rounded-4 p-2 select"
                  id=""
                >
                  <option>No Status Selected</option>
                  {projectList.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
                {errors.projectId?.message && (
                  <p className="text-danger mt-1">
                    {errors.projectId?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="text-decoration-none btn btn-outline-dark rounded-5 px-3"
            >
              Cancel
            </button>
            <button className="text-white btn btn-warning rounded-5 Save px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
