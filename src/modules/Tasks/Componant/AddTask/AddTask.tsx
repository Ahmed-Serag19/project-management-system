import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const task = location.state?.task;

  interface dataTask {
    title: string;
    description: string;
    employeeId: number;
    projectId: number;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<dataTask>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      employeeId: task?.employee?.id || 0,
      projectId: task?.project?.id || 0,
    },
  });

  // Set form values if editing a task
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);

      if (task.employee?.id) {
        setValue("employeeId", task.employee.id.toString());
      }
      if (task.project?.id) {
        setValue("projectId", task.project.id.toString());
      }
    }
  }, [task, setValue]);

  const onSubmit = async (data: dataTask) => {
    try {
      if (task) {
        await axios.put(Task_URLs.update(task.id), data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Task updated successfully");
      } else {
        await axios.post(Task_URLs.create, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Task added successfully");
      }

      // Clear localStorage after successful submission
      localStorage.removeItem("taskTitle");
      localStorage.removeItem("taskDescription");
      localStorage.removeItem("taskEmployeeId");
      localStorage.removeItem("taskProjectId");

      navigate("/dashboard/tasks");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save task");
    }
  };

  const addProject = async () => {
    try {
      let response = await axios.get(Project_URLs.addNewProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjectList(response.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      let response = await axios.get(User_URls.getUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserList(response.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    addProject();
    getAllUsers();
  }, []);

  useEffect(() => {
    const savedTitle = localStorage.getItem("taskTitle") || "";
    const savedDescription = localStorage.getItem("taskDescription") || "";
    const savedEmployeeId = localStorage.getItem("taskEmployeeId") || "0";
    const savedProjectId = localStorage.getItem("taskProjectId") || "0";

    if (!task) {
      reset({
        title: savedTitle,
        description: savedDescription,
        employeeId: parseInt(savedEmployeeId),
        projectId: parseInt(savedProjectId),
      });
    }
  }, [reset, task]);

  // Save form data to local storage when leaving the page to prevent loss of data
  useEffect(() => {
    const saveFormData = () => {
      const form = document.querySelector("form") as HTMLFormElement;
      const formData = new FormData(form);

      localStorage.setItem(
        "taskTitle",
        (formData.get("title") as string) || ""
      );
      localStorage.setItem(
        "taskDescription",
        (formData.get("description") as string) || ""
      );
      localStorage.setItem(
        "taskEmployeeId",
        (formData.get("employeeId") as string) || "0"
      );
      localStorage.setItem(
        "taskProjectId",
        (formData.get("projectId") as string) || "0"
      );
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
        <h2 className="mt-2">{task ? "Update Task" : "Add Task"}</h2>
      </div>
      <div className="my-5 bg-white p-5 rounded-4 shadow w-75 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.title?.message && (
              <p className="text-danger mt-1">{errors.title?.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="description" className="my-4">
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
            {errors.description?.message && (
              <p className="text-danger mt-1">{errors.description?.message}</p>
            )}
          </Form.Group>

          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Label className="text-muted ms-1">User</Form.Label>
              <select
                {...register("employeeId", { required: "User is required" })}
                className="form-control text-secondary border rounded-4 p-2 select"
                defaultValue={task?.employee?.id || 0} // Set default value to show correct selection
              >
                <option value={0}>No User Selected</option>
                {userList.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.userName}
                  </option>
                ))}
              </select>
              {errors.employeeId?.message && (
                <p className="text-danger mt-1">{errors.employeeId?.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <Form.Label className="text-muted ms-1">Project</Form.Label>
              <select
                {...register("projectId", { required: "Project is required" })}
                className="form-control text-secondary border rounded-4 p-2 select"
                defaultValue={task?.project?.id || 0} // Set default value to show correct selection
              >
                <option value={0}>No Project Selected</option>
                {projectList.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              {errors.projectId?.message && (
                <p className="text-danger mt-1">{errors.projectId?.message}</p>
              )}
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
              {task ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
