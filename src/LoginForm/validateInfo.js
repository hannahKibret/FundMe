export default function validateInfo(values,match) {
  let errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email Address required';
  }else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }else if (values.password.length < 8) {
    errors.password = 'Password needs to be 8 characters or more';
  }

  if(match === 'Invalid email or password'){
    console.log('innnnn')
    errors.error = 'Incorrect email address or password'
  }
  return errors;
}
