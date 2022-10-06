import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const useLoginForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
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
    axios.post('http://localhost:5000/api/auth',values)
    .then(res => {

        console.log(res.data)
        console.log(res.headers)
        const token = res.headers['x-auth-token']
        //navigate('/edit-account',{state:token})
        if(!res.data.isAdmin){
          navigate('/',{state:{token:token,firstName:res.data.firstName}})
        }else{
          navigate('/admin',{state:{token:token,firstName:res.data.firstName}})
        }
    }).catch(err=> {
        setErrors(validate(values,err.response.data))
        console.log(err.response.data)
    })
    setErrors(validate(values,''));
    setIsSubmitting(true);
   
  };

  useEffect(
    () => {
     // onStart()
      if (Object.keys(errors).length === 0 && isSubmitting) {
       
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useLoginForm;
