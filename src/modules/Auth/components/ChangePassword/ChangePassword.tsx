import { useState } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../Shared/components/FormLayout/FormLayout";
import { Form, InputGroup } from "react-bootstrap";
import FormButton from "../../../Shared/components/FormButton/FormButton";
import ChangePassBG from '../../../../assets/change-password-bg.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { PasswordValidation } from '../../../../constants/Validations';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ChangePasswordFormInputs = {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ChangePasswordFormInputs>({ mode: 'onSubmit' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleconfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    try {
      const res = await axios.put(User_URls.ChangePassword, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) toast.error(error.response?.data?.message);
        if (error.response?.data?.additionalInfo?.errors?.newPassword[0]) toast.error('Password Should Be Valid Password');
        if (error.response?.data?.additionalInfo?.errors?.confirmNewPassword[0]) toast.error(error.response?.data?.additionalInfo?.errors?.confirmNewPassword[0]);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <FormLayout
      title="Change Password"
      description="Welcome to PMS"
      backgroundImage={ChangePassBG}
      buttonText="Change Password"
    >
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        {/* Old Password */}
        <Form.Group
          controlId="formOldPassword"
          className="mb-4 input-section"
        >
          <Form.Label>Old Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Enter your Old Password"
              {...register('oldPassword', PasswordValidation)}
              isInvalid={!!errors.oldPassword}
            />
            <InputGroup.Text onClick={toggleOldPasswordVisibility}>
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.oldPassword?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {/* New Password */}
        <Form.Group
          controlId="formNewPassword"
          className="mb-4 input-section"
        >
          <Form.Label>New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter your New Password"
              {...register('newPassword', PasswordValidation)}
              isInvalid={!!errors.newPassword}
            />
            <InputGroup.Text onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.newPassword?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {/* Confirm New Password */}
        <Form.Group
          controlId="formConfirmPassword"
          className="mb-4 input-section"
        >
          <Form.Label>Confirm New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showconfirmPassword ? 'text' : 'password'}
              placeholder="Enter Confirm New Password"
              {...register('confirmNewPassword', {
                required: 'Confirm New Password is required',
                validate: (value) => {
                  if (watch('newPassword') !== value) return 'Passwords do not match'
                }
              })}
              isInvalid={!!errors.confirmNewPassword}
            />
            <InputGroup.Text onClick={toggleconfirmPasswordVisibility}>
              {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.confirmNewPassword?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <FormButton buttonText="Save" />
      </Form>
    </FormLayout>
  );
};

export default ChangePassword;
