import React,{ useState, useEffect } from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios';


const AllDonations = () => {

  const [donations, setDonations] = useState([])


  const navigate = useNavigate()
  const location = useLocation()

  const fetchDonation = () => {
    axios.get('http://localhost:5000/api/donations/',{
        headers: {
            'x-auth-token': location.state.token
        }
    })
    .then(res=> {
      console.log(res.data)
      setDonations(res.data)
      }).catch(err => {
        console.log(err)      
    })
  }

  useEffect(() => {
    if(donations.length === 0){
      fetchDonation()
      
    }
  },[donations])

  
  const xbtnClicked = () => {
    navigate('/admin',{state:{token:location.state.token,firstName: location.state.firstName}})
  }

 
 
  return (

    <div className='full-page'>
     <button className='xbtn' onClick={xbtnClicked}>x</button>
      <div>  
        
        {
            donations
            .map(donation =>
              <div className='donated-container'>
                <img className='user-icon' src='img/user.png'/>
                {donation.isAnonymous ? (
                 
                     <span data-cy='don-user'>Anonymous</span>
                
                ):( <span data-cy='don-user'>{donation.userId.firstName} {donation.userId.lastName}</span>)}
                <p data-cy='don-amt'>Donated {donation.amount}birr</p>
                <p data-cy='don-date'>Date: {donation.date.slice(0,10)}</p>
                <hr/>
            </div>
            )}
      </div>
    </div>
  );
};

export default AllDonations;
