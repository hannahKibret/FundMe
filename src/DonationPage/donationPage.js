
import React, { useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import useDonationForm from './useDonationForm';
import validate from './validateInfo';
import './style.css'
const DonationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  function submitForm() {
    setIsSubmitted(true);
  }
  const location = useLocation()
  const navigate = useNavigate()
    const { handleChange, handleAnonChange,handleSubmit, values, errors } = useDonationForm(
        submitForm,validate,location
      );
    
      const xbtnClicked = () => {
        navigate('/view-det',{state:{token:location.state.token,firstName: location.state.firstName,id: location.state.id}})
      }
  return (
    <div>
      <button className='xbtn' onClick={xbtnClicked}>x</button> 
    <div className='container44'> 
      
     <form onSubmit={handleSubmit} className='form2'>
        <div className='donating-for'>
            <img className='don-img' alt='image of the donation' src={location.state.image}/>
            <p> You are donating for<span className='titleName'> {location.state.title} </span>cause</p>
        </div>
        <div className='form-inputs2'>
          <label className='form-label2'>Amount of donation</label>
          <input
            data-cy='d-amount'
            className='form-input2'
            type='number'
            name='amount'
            placeholder='Enter the amount of your donation in birr'
            value={values.amount}
            onChange={handleChange}
          />
        
          <hr/>
          {errors.donation && <p data-cy='a-err' className='errors'>{errors.donation}</p>}
        </div>
        <div onChange={handleChange} name="paymentMethod" className='form-inputs'>
          <label className='form-label2'>Payment Method</label><br/>
          <label> Telebirr  <input data-cy='d-tele'type="radio" id="telebirr" name="paymentMethod" value="telebirr" checked/></label><br/>
          <label> PayPal  <input data-cy='d-pay' type="radio" id="paypal" name="paymentMethod" value="paypal"/></label><br/>
          <hr className='hr-pay'/>
        </div>
        <div className='form-inputs2'>
            <input data-cy = 'd-anon' onChange={handleAnonChange} name="isAnonymous" type="checkbox" id="anonymous" />
            <label className='form-label-check'> Keep me anonymous</label>
            <p className='terms'>By continuing you agree with our terms and private policy</p>
            <hr/>
        </div>
        <button  className='form-input-btn' id='donate-btn' type='submit'>
          Donate Now
        </button>
        </form>
    </div> 
    </div>  
  );
};

export default DonationPage;
