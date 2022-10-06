import React, { useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import './style.css'
import FormFundraise from './FormFundraise';

const FEform = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  function submitForm() {
    setIsSubmitted(true);
  }

  const xbtnClicked = () => {
    navigate('/view-detr',{state:{token:location.state.token,firstName: location.state.firstName,id: location.state.id}})
  }
  return (
      <div className='form-container22'>
       <button className='xbtn' onClick={xbtnClicked}>x</button>
        <div className='form-content-left'>
          <h1 className='form-header'>Lets begin your fundraising journey!</h1>
          <p className='form-header-p'>Please fill out this form to post your fundraiser</p>
        </div>
        <FormFundraise submitForm={submitForm} location ={location} />
        
      </div>
  );
};

export default FEform;
