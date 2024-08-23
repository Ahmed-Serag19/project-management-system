import FormLayout from "../../../Shared/components/FormLayout/FormLayout";
import VerifyBg from "../../../../assets/verify-bg.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type VerifyFormInputs = {
  email: string;
  code: string;
};

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const Navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: VerifyFormInputs) => {
    return await axios
      .put(`https://upskilling-egypt.com:3003/api/v1/Users/verify`, data)
      .then((res) => {
        console.log(res);
        toast.success(`Account Verifyed successfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          style: {
            textAlign: "center",
          },
        });
        localStorage.removeItem("email");
        setTimeout(() => {
          Navigator("/auth/login");
        }, 2000);
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          style: {
            textAlign: "center",
          },
        });
      });
  };

  const getEmail = async () => {
    setEmail(await JSON.parse(localStorage.getItem("email")));
  };

  useEffect(function () {
    getEmail();
  }, []);

  return (
    <>
      <FormLayout
        title="Verify Account"
        buttonText="Save"
        description="welcome to PMS"
        backgroundImage={VerifyBg}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="pt-3">
          <div className="mb-3">
            <label htmlFor="" className="form-label mb-0">
              User Name
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your Email"
              value={email}
              {...register("email", {
                required: "userName is required",
              })}
            />
            {errors.email && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3 ">
            <label htmlFor="" className="form-label mb-0">
              OTP Verification
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter Verification"
              {...register("code", {
                required: "OTP Verification is required",
              })}
            />
            {errors.code && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.code.message}
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

export default VerifyEmail;
