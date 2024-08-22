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
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<ForgetFormInputs>({ mode: 'onChange' });

  let onSubmit = async (data: ForgetFormInputs) => {
    try {
      let response = await axios.post(User_URls.resetRequest, data);
      toast.success(
        response?.data?.message || 'OTP Send Successfully'
      );
      console.log(response);
      navigate('/auth/reset-password');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
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
            />

            {errors.email && (
              <p className="text-danger text-center mt-1">
                {errors.email?.message}
              </p>
            )}
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
