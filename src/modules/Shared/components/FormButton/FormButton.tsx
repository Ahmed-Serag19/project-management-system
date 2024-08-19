import React from 'react';
import { Button } from 'react-bootstrap';

type FormButtonProps = {
  buttonText: string;
  buttonType?: 'button' | 'submit' | 'reset';
};

const FormButton: React.FC<FormButtonProps> = ({
  buttonText,
  buttonType = 'submit',
}) => {
  return (
    <Button type={buttonType} className="form-layout-button w-100">
      {buttonText}
    </Button>
  );
};

export default FormButton;
