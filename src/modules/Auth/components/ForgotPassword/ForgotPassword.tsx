import FormLayout from '../../../Shared/components/FormLayout/FormLayout';
import ForgetBg from '../../../../assets/forgot-password-bg.png';
import { Form } from 'react-bootstrap';
import { EmailValidation } from '../../../../constants/Validations';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { User_URls } from '../../../../constants/End_Points';
export default function ForgotPassword() {
  type ForgetFormInputs = {
    email: string;
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<ForgetFormInputs>({ mode: 'onChange' });

  const onSubmit = async (data: ForgetFormInputs) => {
    try {
      const response = await axios.post(User_URls.resetRequest, data);
      toast.success(
        response?.data?.message || 'OTP Send Successfully'
      );
      console.log(response);
      navigate('/auth/reset-password');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'An error occurred'
        );
        console.log(error.response?.data?.message);
      } else {
        toast.error('An unexpected error occurred');
        console.log('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div>
      <FormLayout
        title="ForgotPassword"
        description="Welcome to PMS"
        backgroundImage={ForgetBg}
        buttonText="Verify"
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
              {...register('email', EmailValidation)}
              isInvalid={!!errors.email}
            />
         <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
      
          </Form.Group>

          <button
            className="form-layout-button w-100"
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
          >
            Verify
          </button>
        </Form>
      </FormLayout>
    </div>
  );
}
