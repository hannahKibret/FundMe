import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const useSignupForm = (callback, validate) => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',  
    phone: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const navigate = useNavigate()
  


  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
   
    const user = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
      phoneNumber: values.phone
    }
    if(values.password === values.password2 | !values.password){
      axios.post('http://localhost:5000/api/users',user)
      .then(res => {
          console.log(res.data)
          console.log(res.headers)
          navigate('/',{state:{token:res.headers['x-auth-token'],firstName:res.data.firstName}})
      }).catch(err => {
        console.log(err.response.data)
        setErrors(validate(values,err.response.data))
        
      })
    }

    setErrors(validate(values));
    setIsSubmitting(true);
   
   
  };

  
  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useSignupForm;
