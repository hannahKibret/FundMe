import { useState ,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';


const useDonationForm = (callback,validate,location) => {
  const [values, setValues] = useState({
    amount: undefined,
    paymentMethod:'telebirr',
  });
  const [isAnonymous,setIsAnonymous] = useState(false)
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    console.log(e.target.name)
  };

  const handleAnonChange = e => {
    setIsAnonymous(e.target.checked);
    console.log(e.target.checked)
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    setErrors(validate(values));
    setIsSubmitting(true);
    const donation={
      amount: values.amount,
      paymentMethod: values.paymentMethod,
      isAnonymous: isAnonymous
    }
    axios.post('http://localhost:5000/api/donations/'+location.state.id,donation,{
            headers: {
                'x-auth-token':location.state.token
            }
        })
        .then(res => {
            console.log(res.data)
              navigate('/view-det',{state:{token:location.state.token,firstName:location.state.firstName,id:location.state.id}})
        }).catch(err => {
            // setDone(true)
            console.log(err.response.body)
        })
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback()
      }
    },
    [errors]
  );
  return { handleChange, handleAnonChange,handleSubmit, values, errors };
};

export default useDonationForm;
