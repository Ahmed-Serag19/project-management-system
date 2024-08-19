import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import FormLayout from '../../../Shared/components/FormLayout/FormLayout';
import LoginBg from '../../../../assets/login-bg.png';
import FormButton from '../../../Shared/components/FormButton/FormButton';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ mode: 'onTouched' });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <FormLayout
      title="Login"
      description="Welcome to PMS"
      backgroundImage={LoginBg}
      buttonText="Login"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <Form.Group controlId="formEmail" className="mb-4">
          <Form.Label className="text-warning">E-mail</Form.Label>
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

        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label className="text-warning">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message:
                  'Password must be at least 6 characters long and include at least one uppercase letter and one number',
              },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-between mb-4">
          <a href="/register" className="text-white">
            Register Now ?
          </a>
          <a href="/forgot-password" className="text-white">
            Forget Password ?
          </a>
        </div>

        <FormButton buttonText="Login" />
      </Form>
    </FormLayout>
  );
};

export default LoginForm;
