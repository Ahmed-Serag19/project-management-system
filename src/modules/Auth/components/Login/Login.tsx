import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import FormLayout from '../../../Shared/components/FormLayout/FormLayout';
import LoginBg from '../../../../assets/login-bg.png';
type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  return (
    <FormLayout
      title="Login"
      description="Welcome to PMS"
      backgroundImage={LoginBg}
      buttonText="Login"
    ></FormLayout>
  );
};

export default LoginForm;
