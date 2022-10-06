import React, { useState } from 'react';
import "./style/StForm.css";
import FormLogin from './FormLogin';

const LoginForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
      <div className='form-container'>
        {/* <span className='close-btn'>×</span> */}
        <div className='form-content-left'>
          <img className='form-img' src='img/img1.png' alt='holding hands' />
        </div>
        <FormLogin submitForm = {submitForm}/>
        {/* {!isSubmitted ? (
          <FormLogin submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )} */}
      </div>
  );
};

export default LoginForm;
