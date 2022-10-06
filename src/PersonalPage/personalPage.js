import React, { useState } from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import "./style.css"


const PersonalPage = () => {

    const navigate = useNavigate()
    const location = useLocation()

    console.log("form fundacc")
    console.log(location.state)
    const editClicked = () =>{
        navigate('/edit-account',{state:{token:location.state.token,firstName:location.state.firstName}})
    }

    const fundClicked = () =>{
        navigate('/post-fund',{state:{token:location.state.token,firstName:location.state.firstName}})
    }

    const viewOnClick = () => {
        navigate('/fund-lisr',{state:{token:location.state.token,firstName:location.state.firstName}})
      }
      const xbtnClicked = () => {
        navigate('/',{state:{token:location.state.token,firstName: location.state.firstName}})
      }
  return (
      <div className='container33'>
        <div className='content'>
        <button className='xbtn' onClick={xbtnClicked}>x</button> 
            <h1>Welcome, {location.state.firstName}!</h1>
            <p>What would you like to do?</p>
            <div className='columns'>
                <div className='col-1'>
                    <img  className="img3" src='img/img-1.svg' alt='user icon'/>
                    <button data-cy ="ed-acc" className="perbtn" onClick={editClicked}>Edit your account</button>
                </div>
                <div className='col-1'>
                    <img  className="img3" src='img/img-2.svg' alt='user icon'/>
                    <button data-cy = "post-fund" className="perbtn" onClick={fundClicked}>Post a fundraiser</button>
                </div>
                <div className='col-1'>
                    <img  className="img3" src='img/img-3.svg' alt='user icon'/>
                    <button data-cy= "view-fund"className="perbtn" onClick = {viewOnClick}>View your fundraisers</button>
                </div>
            </div>
        </div>
    
      </div> 
      
  );
};

export default PersonalPage;
