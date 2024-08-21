export const EmailValidation ={
    required:"Email Is Required",
    pattern:{
      value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"Email Should Be Valid Mail"

    },
}
const PasswordRegEx= 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$ !%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const PasswordValidation={
required:"Password Is Required",
pattern:{
  value:PasswordRegEx,
  message:"Password Should Be Valid Password "

},

}