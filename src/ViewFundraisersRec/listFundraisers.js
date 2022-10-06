import React from 'react';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import './style.css';
import axios from 'axios'
const ListFundraisersRec = () => {

 const [funds, setFunds] = useState([]);
 const location = useLocation()

 const fetchFundraisers = () => {
    axios.get('http://localhost:5000/api/fundraisers/user',{
        headers: {
            'x-auth-token':location.state.token
        }
    })
    .then(res=> {
        console.log(res.data)
        setFunds(res.data)
    }).catch(err => {
        console.log(err)
    })
 }

 const navigate = useNavigate()

function viewClicked(id) {
     console.log(id)
     console.log(location.state)
    navigate('/view-detr',{state:{token:location.state.token,firstName: location.state.firstName,id:id}})
}

 useEffect(
    () => {
      if(funds.length === 0){
          fetchFundraisers()
      }
    },
    [funds]
  );

  const xbtnClicked = () => {
    navigate('/fund-acc',{state:{token:location.state.token,firstName: location.state.firstName}})
  }

  return (
    <div className='body'>
    <button className='xbtn' onClick={xbtnClicked}>x</button> 
    {
        funds
        .map(fund =>
            // <div key = {fund._id}>
            //     <li>Title: {fund.title}</li>
            //     <li>Goal Amount: {fund.goalAmount}</li>
            // </div>
           
             <div key= {fund._id} className='container'>
             <div data-cy='r-img' className='images'>
                 <img className="img-fund"src={fund.image} />
             </div>
             <div className='product'>
                 <h1 data-cy='r-title'>{fund.title}</h1>
                 {(fund.story.length > 149) ? (
                      
                      <p data-cy='r-story' className='desc'>{fund.story.slice(0,150)}...</p>
                   ) : (
                    <p data-cy='r-story' className='desc'>{fund.story}</p>
                   )}
                 {/* <p className='desc'>{fund.story.slice(0,100)}...</p> */}
                 <h3 data-cy='r-goal'>{fund.totalRaised.birr + (fund.totalRaised.dollar *50)}birr raised of {fund.goalAmount}birr</h3>
                  {(fund.donations.length>0) ? (
                      
           <p>Last donation: {(fund.donations)[0].date.slice(0,10)}</p>
        ) : (
           <p></p>
        )}
                 <div className='buttons'>
                     <button data-cy='r-btn' className='add' onClick={() => viewClicked(fund._id)}>View Details</button>
                 </div>
             </div>
         </div>
        
            
            )
            
    }
    </div>
  );
};

export default ListFundraisersRec;
