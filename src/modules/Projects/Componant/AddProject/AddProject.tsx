import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Project_URLs, requestHeader } from "../../../../constants/End_Points";
import { useEffect } from "react";

type addProjuctInputs = {
  title: string;
  description: string;
};

function AddProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addProjuctInputs>();

  const Navigator = useNavigate();
  const location = useLocation();

  const { taskData, type } = location.state ? location.state : "";

  console.log(taskData);
  console.log(type);

  // Function to handle form submission
  const addNewProjuct = async (data: addProjuctInputs) => {
    try {
      const res = await axios({
        method: type === "edit" ? "PUT" : "POST",
        url:
          type === "edit"
            ? Project_URLs.updateProject(taskData.Project.id)
            : Project_URLs.addNewProject,
        data: data,
        headers: requestHeader,
      });

      // Clear localStorage after successful form submission
      localStorage.removeItem("title");
      localStorage.removeItem("description");

      // Reset the form after submission
      reset();

      // Navigate to the desired page
      Navigator("/dashboard/projects");

      toast.success(
        `Project ${type === "edit" ? "Edited" : "Added"} Successfully`
      );
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedTitle = localStorage.getItem("title") || "";
    const savedDescription = localStorage.getItem("description") || "";

    // Pre-fill the form if data exists in localStorage
    reset({
      title: savedTitle,
      description: savedDescription,
    });

    const saveFormData = (e: BeforeUnloadEvent) => {
      // Prevent the user from leaving without confirmation
      e.preventDefault();
      e.returnValue = ""; // This triggers the browser confirmation dialog

      const form = document.querySelector("form") as HTMLFormElement;
      const formData = new FormData(form);

      // Save form data to localStorage
      localStorage.setItem("title", (formData.get("title") as string) || "");
      localStorage.setItem(
        "description",
        (formData.get("description") as string) || ""
      );
    };

    window.addEventListener("beforeunload", saveFormData);

    return () => {
      window.removeEventListener("beforeunload", saveFormData);
    };
  }, [reset]);

  return (
    <div>
      <div className="dark-green  ps-5 py-4 bg-white">
        <Link
          to={"/dashboard/projects"}
          className="text-decoration-none text-muted"
        >
          <IoIosArrowBack /> View All Projects
        </Link>
        {/* <h2 className="mt-2">Add a New Project</h2> */}
        {type == "edit" ? (
          <h2 className="mt-2">Edit a Project</h2>
        ) : (
          <h2 className="mt-2">Add a New Project</h2>
        )}
      </div>
      <div className="my-5 bg-white p-5 rounded-4 shadow w-75 m-auto">
        <form onSubmit={handleSubmit(addNewProjuct)}>
          <div className="mb-5">
            <Form.Group controlId="name">
              <Form.Label className="text-muted">Enter project name</Form.Label>
              <InputGroup>
                <Form.Control
                  className="border rounded-4 p-2 text-secondary"
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: "Project Title is required!",
                  })}
                  defaultValue={taskData?.Project?.title}
                />
              </InputGroup>
            </Form.Group>
            {errors.title?.message && (
              <p className="text-danger mt-1">{errors.title?.message}</p>
            )}
          </div>
          <div className="mb-5">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text-muted">Description</Form.Label>
              <Form.Control
                className="border rounded-4 p-2 text-secondary"
                as="textarea"
                placeholder="Description"
                rows={3}
                {...register("description", {
                  required: "Project description is required!",
                })}
                defaultValue={taskData?.Project?.description}
              />
            </Form.Group>
            {errors.description?.message && (
              <p className="text-danger mt-1">{errors.description?.message}</p>
            )}
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <Link
              to={"/dashboard/home"}
              className="text-decoration-none btn btn-outline-dark rounded-5 px-3"
            >
              Cancel
            </Link>
            <button className="text-white btn btn-warning Save rounded-5 px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProject;
