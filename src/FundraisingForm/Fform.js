import React, { useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import './style.css'
import FormFundraise from './FormFundraise';

const Fform = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  console.log("from Fform")
  console.log(location)
  function submitForm() {
    setIsSubmitted(true);
  }

  const xbtnClicked = () => {
    navigate('/fund-acc',{state:{token:location.state.token,firstName: location.state.firstName}})
  }

  return (
      <div className='form-container22'>
        {/* <span className='close-btn'>×</span> */}
        <div className='form-content-left'>
        <button className='xbtn' onClick={xbtnClicked}>x</button>
          <h1 className='form-header'>Lets begin your fundraising journey!</h1>
          <p className='form-header-p'>Please fill out this form to post your fundraiser</p>
        </div>
        <FormFundraise submitForm={submitForm} location ={location} />
        
      </div>
  );
};

export default Fform;
