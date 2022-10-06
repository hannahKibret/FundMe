import React, { useState } from 'react';
import "./style/StForm.css";
import FormSignup from './FormSignup';

const SignupForm = () => {
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
        <FormSignup submitForm={submitForm} />
        {/* {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )} */}
      </div>
    
  );
};

export default SignupForm;
