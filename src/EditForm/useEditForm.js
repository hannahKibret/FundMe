import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const useEditForm = (callback, validate,location) => {

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',  
    phone: '',
    email: '',
    password: '',
    password2: '',
    isDeactivate: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count,setCount] = useState(0)
  
  //const location = useLocation();
  //console.log(location)
  const navigate = useNavigate();

  const fetchUser = () => {
    axios.get('http://localhost:5000/api/users/me',{
        headers: {
            'x-auth-token': location.state.token
        }
    })
    .then(res=> {
      console.log(res.data)
      setValues({
        firstname: res.data.firstName,
        lastname: res.data.lastName,
        phone: res.data.phoneNumber,
        email: res.data.email,
        // password: '',
        // password2:'',
        isDeactivate: res.data.isDeactivated
      })
      })
  }

  useEffect(() => {
    if(count === 0){
      fetchUser()
      setCount(1)
    }
   
},[values])

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    const user = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      isDeactivated: values.isDeactivated
    }
    if(values.password === values.password2){
      axios.put('http://localhost:5000/api/users/me',user,{
          headers: {
              'x-auth-token':location.state.token
          }
      })
      .then(res => {
          console.log(res.data)
          navigate('/',{state:{token:location.state.token,firstName:values.firstname}})
      }).catch(err => {
        console.log(err.response.data)
      })
   }
  };

  const handleDeactivate = e => {
    e.preventDefault();

    // setErrors(validate(values));
    setIsSubmitting(true);
    const user = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      isDeactivated: true
    }
 
      axios.put('http://localhost:5000/api/users/me',user,{
          headers: {
              'x-auth-token':location.state.token
          }
      })
      .then(res => {
          console.log(res.data)
          navigate('/')
      })
   
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, handleDeactivate, values, errors };
};

export default useEditForm;
