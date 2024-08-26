import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormLayout from "../../../Shared/components/FormLayout/FormLayout";
import LoginBg from "../../../../assets/login-bg.png";
import FormButton from "../../../Shared/components/FormButton/FormButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User_URls } from "../../../../constants/End_Points";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/Validations";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { saveToken } = authContext as AuthContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {

      const response = await axios.post<{ token: string; expiresIn: string }>(
        User_URls.login,
        data
      );
      toast.success('Logged in successfully!');

      saveToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            'Login failed. Please try again.',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        toast.error(
          'An unexpected error occurred. Please try again.',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  return (
    <FormLayout
      title="Login"
      description="Welcome to PMS"
      backgroundImage={LoginBg}
      buttonText="Login"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <Form.Group controlId="formEmail" className="mb-4 input-section">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your E-mail"
            {...register("email", EmailValidation)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4 input-section">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", PasswordValidation)}
              isInvalid={!!errors.password}
            />
            <InputGroup.Text onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-flex justify-content-between mb-4">
          <Link to="/auth/register" className="text-white">
            Register Now ?
          </Link>
          <Link to="/auth/forgot-password" className="text-white">
            Forget Password ?
          </Link>
        </div>

        <FormButton buttonText="Login" />
      </Form>
    </FormLayout>
  );
};

export default LoginForm;
