export default function validateInfo(values) {
  let errors = {};
  
  if (!values.firstname.trim()) {
    errors.firstname = 'First name required';
  }

  if (!values.lastname.trim()) {
    errors.lastname = 'Last name required';
  }


  if (!values.phone.trim()) {
    errors.phone = 'Phone number required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  console.log(values.password)
  if(values.password){
    if (values.password.length < 8) {
      errors.password = 'Password needs to be 8 characters or more';
    }if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
  }
  // if(values.password === '' || values.password === undefined){
    
  //   }else{
  //     if (values.password.length < 8) {
  //       errors.password = 'Password needs to be 8 characters or more';
  //   }
  // }


  // if (values.password2 !== values.password) {
  //   errors.password2 = 'Passwords do not match';
  // }
  return errors;
}
