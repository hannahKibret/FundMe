import React, { useState } from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import "./style.css"


const AdminPersonalPage = () => {

    const navigate = useNavigate()
    const location = useLocation()

    console.log("form fundacc")
    console.log(location.state)

    const catClicked = () =>{
        navigate('/post-cat',{state:{token:location.state.token,firstName:location.state.firstName}})
    }

    const viewOnClick = () => {
        navigate('/fund-lisa',{state:{token:location.state.token,firstName:location.state.firstName}})
      }

      const donClicked = () => {
        navigate('/donations',{state:{token:location.state.token,firstName:location.state.firstName}})
      }

  return (
      <div className='container33'>
        <div className='content'>
            <h1>Welcome, {location.state.firstName}!</h1>
            <p>What would you like to do?</p>
            <div className='columns'>
                <div className='col-1'>
                    <img  className="img3" src='img/img-2.svg' alt='user icon'/>
                    <button data-cy = "add-cat" className="perbtn" onClick={catClicked}>Add/Delete Category</button>
                </div>
                <div className='col-1'>
                    <img  className="img3" src='img/img-3.svg' alt='user icon'/>
                    <button data-cy= "view-fund"className="perbtn" onClick = {viewOnClick}>View fundraisers</button>
                </div>
                <div className='col-1'>
                    <img  className="img3" src='img/img-1.svg' alt='user icon'/>
                    <button data-cy ="don-view" className="perbtn" onClick={donClicked}>View all Donations</button>
                </div>
            </div>
        </div>
    
      </div> 
      
  );
};

export default AdminPersonalPage;
