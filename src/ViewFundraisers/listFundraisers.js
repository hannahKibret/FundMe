import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import './style.css';
import axios from 'axios'
const ListFundraisers = ({location}) => {

 const [funds, setFunds] = useState([]);

 const fetchFundraisers = () => {
    axios.get('http://localhost:5000/api/fundraisers/popular',{
    })
    .then(res=> {
        console.log(res.data)
        setFunds(res.data)
    })
 }

 const navigate = useNavigate()

 function viewClicked(id) {
     console.log(id)
     console.log(location)
    navigate('/view-det',{state:{token:location.state.token,firstName: location.state.firstName,id:id}})
}
 useEffect(
    () => {
      if(funds.length === 0){
          fetchFundraisers()
      }
    },
    [funds]
  );
  return (
    <div className='body'> 
    {
        funds
        .map(fund =>
            // <div key = {fund._id}>
            //     <li>Title: {fund.title}</li>
            //     <li>Goal Amount: {fund.goalAmount}</li>
            // </div>
           
             <div key= {fund._id} className='container'>
             <div className='images'>
                 <img data-cy='f-img' className="img-fund" src={fund.image} />
             </div>
             <div className='product'>
                 <h1 data-cy='f-title'>{fund.title}</h1>
                 {(fund.story.length > 149) ? (
                      
                      <p data-cy='f-story' className='desc'>{fund.story.slice(0,150)}...</p>
                   ) : (
                    <p data-cy='f-story' className='desc'>{fund.story}</p>
                   )}
                 {/* <p className='desc'>{fund.story.slice(0,100)}...</p> */}
                 <h3 data-cy='f-goal'>{fund.totalRaised.birr + (fund.totalRaised.dollar *50)}birr raised of {fund.goalAmount}birr</h3>
                  {(fund.donations.length>0) ? (
                      
           <p>Last donation: {(fund.donations)[0].date.slice(0,10)}</p>
        ) : (
           <p></p>
        )}
                 <div className='buttons'>
                     <button className='add' onClick={() => viewClicked(fund._id)}>View Details</button>
                 </div>
             </div>
         </div>
        
            
            )
            
    }
    
    </div>
  );
};

export default ListFundraisers;
