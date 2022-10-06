export default function validateInfo(values,err) {
  let errors = {};
  
  if (!values.firstname.trim()) {
    errors.firstname = 'First name required';
  }

  if (!values.lastname.trim()) {
    errors.lastname = 'Last name required';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number required';
  }else if (values.phone.length != 10) {
    errors.phone = 'Phone number needs to be 10 characters ';
  }else if(err === 'Phone number already exists'){
    errors.phone = 'Phone number already exists'
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }else if(err === 'Email address already exists'){
    errors.email = 'Email address already exists'
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password needs to be 8 characters or more';
  }

  if (!values.password2) {
    errors.password2 = 'Password is required';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }
  return errors;
}
