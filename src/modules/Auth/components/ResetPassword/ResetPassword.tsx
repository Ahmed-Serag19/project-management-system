import FormLayout from "../../../Shared/components/FormLayout/FormLayout";
import Reset from "../../../../assets/reset-password-bg.png";
import { Form, InputGroup } from "react-bootstrap";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/Validations";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User_URls } from "../../../../constants/End_Points";

export default function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //new state for eye btn in password
  type resetFormInputs = {
    email: string;
    password: string;
    seed: string;
    confirmPassword: string;
  };

  // const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  const navigate = useNavigate();
  const onSubmit = async (data: resetFormInputs) => {
    try {
      const response = await axios.post(User_URls.reset, data);
      toast.success(response?.data?.message || "Password Changed");
      console.log(response);

      navigate("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type guard to ensure error is AxiosError
        toast.error(error.response?.data.message || "An error occurred");
        console.log(error.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");

        console.error(error);
      }
    }
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<resetFormInputs>({ mode: "onChange" });

  return (
    <div>
    <FormLayout
      title="Reset Password"
      description="Welcome to PMS"
      backgroundImage={Reset}
      buttonText="Save"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-3">
        {/* Email */}
        <Form.Group controlId="formEmail" className="mb-1 input-section">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your E-mail"
            {...register("email", EmailValidation)}
          />
        </Form.Group>

        {errors.email && (
          <p className="text-danger mb-1 text-left">
            {errors.email?.message}
          </p>
        )}

        {/* Otp */}
        <Form.Group controlId="formName" className="mb-1 input-section">
          <Form.Label>OTP Verification</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Verification"
            {...register("seed", {
              required: "OTP is required",
              minLength: {
                value: 4,
                message: "OTP must have at least 4 characters",
              },
            })}
          />
        </Form.Group>

        {errors.seed && (
          <p className="text-danger mb-1 text-left">{errors.seed?.message}</p>
        )}

        {/* password */}
        <Form.Group controlId="formPassword" className="input-section ">
          <Form.Label>New Password</Form.Label>

          {/* change start here i made a new div and give it display flex */}

          <div className="d-flex justify-content-between mb-1 ">
            <Form.Control
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your New password"
              {...register("password", PasswordValidation)}
            />

            {/* new key using btn for eye */}
            <div>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                }}
                aria-hidden="true"
                type="button"
                className="text-end  btn-eye"
                id="basic-addon1"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <span className="sr_only">
                  {isPasswordVisible ? "Hide Password" : "Show Password"}
                </span>
                <i
                  className={`fa ${
                    isPasswordVisible
                      ? "fa-eye-slash eyeIcon"
                      : "fa-eye eyeIcon"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </Form.Group>

        {errors.password && (
          <p className="text-danger mb-1 text-left">
            {errors.password?.message}
          </p>
        )}

        {/* password-confirm */}
        <Form.Group controlId="formPassword" className="mb-1 input-section">
          <Form.Label>Confirm Password</Form.Label>

          {/*  new div and give it display flex */}

          <div className="d-flex justify-content-between mb-1">
            <Form.Control
              type={isPasswordVisible ? "text" : "password"}
              // type={showPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: "ConfirmPassword is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />

            {/* new key using btn for eye */}
            <div>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                }}
                aria-hidden="true"
                type="button"
                className="text-end  btn-eye"
                id="basic-addon1"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <span className="sr_only">
                  {isPasswordVisible ? "Hide Password" : "Show Password"}
                </span>
                <i
                  className={`fa ${
                    isPasswordVisible
                      ? "fa-eye-slash eyeIcon"
                      : "fa-eye eyeIcon"
                  }`}
                ></i>
              </button>
            </div>
            

            {/* <InputGroup.Text onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
         */}
          </div>
        </Form.Group>
        {errors.confirmPassword && (
          <p className="text-danger mb-1 text-left ">
            {errors.confirmPassword?.message}
          </p>
        )}
        <button
          className="form-layout-button w-100"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
        >
          Save
        </button>
      </Form>
    </FormLayout>
  </div>
  );
}
