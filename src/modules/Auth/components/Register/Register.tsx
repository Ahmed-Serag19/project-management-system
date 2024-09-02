import FormLayout from "../../../Shared/components/FormLayout/FormLayout";
import RegisterBg from "../../../../assets/register-bg.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import profileDefaultPic from "../../../../assets/8550fbcbe60cd242d12760784feff287.jpeg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User_URls } from "../../../../constants/End_Points";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/Validations";

type RegisterFormInputs = {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  profileImage: FileList;
  password: string;
  confirmPassword: string;
};

const convertToFormData = (data: RegisterFormInputs): FormData => {
  const recipeFormData = new FormData();

  recipeFormData.append("userName", data.userName);
  recipeFormData.append("email", data.email);
  recipeFormData.append("country", data.country);
  recipeFormData.append("phoneNumber", data.phoneNumber);
  if (data.profileImage.length > 0) {
    recipeFormData.append("profileImage", data.profileImage[0]);
  }
  recipeFormData.append("password", data.password);
  recipeFormData.append("confirmPassword", data.confirmPassword);

  return recipeFormData;
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const formData = convertToFormData(data);
      const res = await axios.post(User_URls.register, formData);
      console.log(res);
      toast.success(`Account created successfully, Verify your email`);
      localStorage.setItem("email", JSON.stringify(data.email));
      navigate("/auth/verify-email");
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <>
      <FormLayout
        title="Create New Account"
        buttonText="Save"
        description="welcome to PMS"
        backgroundImage={RegisterBg}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="row flex-wrap pt-3">
          <div className="mb-3 text-center">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="d-none"
              {...register("profileImage", {
                required: "profileImage is required",
              })}
            />
            <label htmlFor="fileInput" className="profile-pic">
              <img
                src={profileDefaultPic}
                alt="Profile Picture"
                className="profile-pic-img"
              />
              <span className="camera-icon"> {<FaCamera />}</span>
            </label>

            {errors.profileImage && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-0">
              User Name
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your name"
              {...register("userName", {
                required: "userName is required",
                pattern: {
                  value: /^[a-zA-Z]+[a-zA-Z0-9]*\d+$/,
                  message:
                    "The userName must be at least 4 characters & must contain characters and end with numbers without spaces",
                },
              })}
            />
            {errors.userName && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="col-md-6 mb-3 ">
            <label htmlFor="" className="form-label mb-0">
              E-mail
            </label>
            <input
              type="email"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your E-mail"
              {...register("email", EmailValidation)}
            />
            {errors.email && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="col-md-6 mb-3 ">
            <label htmlFor="" className="form-label mb-0">
              Country
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your country"
              {...register("country", {
                required: "country is required",
              })}
            />
            {errors.country && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.country.message}
              </p>
            )}
          </div>

          <div className="col-md-6 mb-3 ">
            <label htmlFor="" className="form-label mb-0">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-0">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your password"
              {...register("password", PasswordValidation)}
            />
            {errors.password && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="" className="form-label mb-0">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: "Password is required",
                validate: (value) =>
                  value === watch("password") || "The passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-main rounded-5 mt-4 fw-bold text-white d-block w-50 mx-auto"
          >
            Save
          </button>
        </form>
      </FormLayout>
    </>
  );
};

export default Register;
