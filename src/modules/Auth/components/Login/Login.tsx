import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormLayout from '../../../Shared/components/FormLayout/FormLayout';
import LoginBg from '../../../../assets/login-bg.png';
import FormButton from '../../../Shared/components/FormButton/FormButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User_URls } from '../../../../constants/End_Points';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: 'onChange' });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(User_URls.login, data);

      toast.success('Logged in successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
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
        <Form.Group
          controlId="formEmail"
          className="mb-4 input-section"
        >
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your E-mail"
            {...register('email', {
              required: 'E-mail is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid e-mail address',
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="formPassword"
          className="mb-4 input-section"
        >
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    'Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character',
                },
              })}
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
          <a href="/auth/register" className="text-white">
            Register Now ?
          </a>
          <a href="/auth/forgot-password" className="text-white">
            Forget Password ?
          </a>
        </div>

        <FormButton buttonText="Login" />
      </Form>
    </FormLayout>
  );
};

export default LoginForm;
