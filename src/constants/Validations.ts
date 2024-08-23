export const EmailValidation = {
  required: 'Email Is Required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Enter a valid e-mail address',
  },
};
export const PasswordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$ !%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const PasswordValidation = {
  required: 'Password Is Required',
  pattern: {
    value: PasswordRegEx,
    message:
      'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.',
  },
};
