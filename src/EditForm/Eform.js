import React, { useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
//import { StEform } from "./style";
import FormEdit from './FormEdit';
import './style.css';

const Eform = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  function submitForm() {
    setIsSubmitted(true);
  }

  const xbtnClicked = () => {
    navigate('/fund-acc',{state:{token:location.state.token,firstName: location.state.firstName}})
  }
  return (
      
    <div className='form-container'> 
      <div className='form-content-left'>
      <button className='xbtn' onClick={xbtnClicked}>x</button>
      <img className='form-img' src='img/img1.png' alt='holding hands' />
      {/* <button className='xbtn'>x</button> */}
        
       
    </div>
    <FormEdit submitForm={submitForm} location ={location}/>
        {/* {!isSubmitted ? (
          <FormEdit submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )} */}
      </div> 
  );
};

export default Eform;
