import FormLayout from "../../../Shared/components/FormLayout/FormLayout";
import VerifyBg from "../../../../assets/verify-bg.png";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type VerifyFormInputs = {
  email: string;
  code: string;
};

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormInputs>();

  const onSubmit: SubmitHandler<VerifyFormInputs> = async (data) => {
    return await axios
      .put(`https://upskilling-egypt.com:3003/api/v1/Users/verify`, data)
      .then(() => {
        toast.success(`Account Verified successfully`);
        localStorage.removeItem("email");
        navigate("/auth/login");
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.message}`);
      });
  };

  const getEmail = async () => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(JSON.parse(savedEmail));
    }
  };

  useEffect(() => {
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
            <label htmlFor="email" className="form-label mb-0">
              Email
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter your Email"
              value={email}
              {...register("email", {
                required: "Email is required",
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            {errors.email && typeof errors.email.message === "string" && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3 ">
            <label htmlFor="code" className="form-label mb-0">
              OTP Verification
            </label>
            <input
              type="text"
              className="form-control bg-transparent border-bottom pb-2"
              placeholder="Enter Verification Code"
              {...register("code", {
                required: "OTP Verification is required",
              })}
            />
            {errors.code && typeof errors.code.message === "string" && (
              <p className="alert alert-danger p-1 my-1 ps-2 rounded-1 w-100">
                {errors.code.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-main rounded-5 mt-4 text-white d-block w-100 py-2"
          >
            Save
          </button>
        </form>
      </FormLayout>
    </>
  );
};

export default VerifyEmail;
