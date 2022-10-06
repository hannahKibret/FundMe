import React,{ useState, useEffect } from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios';
import "./style.css"

const ViewFundDetails = () => {

  const [values, setValues] = useState({
    title: '',
    image: '',  
    goal: '',
    totalRaised:{},
    story: '',
    donations:[],
    category:'',
    recipient: ''
  });

  const [count,setCount] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()

  const fetchFund = () => {
    axios.get('http://localhost:5000/api/fundraisers/id/'+ location.state.id,{
        headers: {
            'x-auth-token': location.state.token
        }
    })
    .then(res=> {
      console.log(res.data)
      setValues({
       title: res.data.title,
       image: res.data.image,
       story: res.data.story,
       goal: res.data.goalAmount,
       totalRaised: res.data.totalRaised,
       donations: res.data.donations,
       category: res.data.category._id,
       recipient: `${res.data.recipient.firstName} ${res.data.recipient.lastName}`

      })
      })
  }

  useEffect(() => {
    if(count === 0){
      fetchFund()
      setCount(1)
    }
  },[values])

  
  const xbtnClicked = () => {
    navigate('/fund-lisr',{state:{token:location.state.token,firstName: location.state.firstName}})
  }

  const editClicked = (title,image,story,goal,category) => {
    navigate('/edit-fund',{state:{token:location.state.token,firstName: location.state.firstName,id:location.state.id,title:title,image:image,story:story,goal:goal,category:category}})
  }

  const deleteClicked = () => {
    axios.delete('http://localhost:5000/api/fundraisers/'+ location.state.id,{
      headers: {
          'x-auth-token': location.state.token
      }
  })
  .then(res=> {
    console.log(res.data)
    navigate('/fund-lisr',{state:{token:location.state.token,firstName: location.state.firstName}})
    
    })
  }
  return (

    <div className='full-page'>
     <button className='xbtn' onClick={xbtnClicked}>x</button>
      <div>
        <h1 data-cy='f-title'>{values.title}</h1>
        <div className='img-side-card'>

          <div className='card-img'>
            <img data-cy='f-img' className='fund-img' src={values.image} alt="img"/>
          </div>
          <div className='card-container'>
          
            <div className='header-donated'>
              <span><h2 data-cy='f-current'>{values.totalRaised.birr + (values.totalRaised.dollar *50)}birr</h2> raised out of {values.goal}birr</span>
            </div>
            <div className='progress-container'>
              {/* <progress value={((values.totalRaised.birr + (values.totalRaised.dollar *50)) * 100)/values.goal} max={100}>{((values.totalRaised.birr + (values.totalRaised.dollar *50))* 100)/values.goal}%</progress> */}
            <div className='progress-container2' style={{width:`${((values.totalRaised.birr + (values.totalRaised.dollar *50)) * 100)/values.goal}%`}}></div>
            </div>
            <div className='header-people'>
              <span><h3>{values.donations.length}</h3> people have donated so far</span>
            </div>
            <div className='edit-header'>
              <h2>Manage your fundraiser here</h2>
            </div>
            
            <button className='edit' onClick={() => editClicked(values.title,values.image,values.story,values.goal,values.category)}>Edit</button>
            <button className="delete" onClick={ deleteClicked}>Delete</button>
            {/* <p className='desc-2'>Mauris ac nisi elementum, bibendum elit non, vehicula dolor. Aliquam non fringilla nisl, rutrum finibus felis. Cras gravida ornare erat</p> */}
          </div>
        </div>
        <div className='name-container'>
          <img className='user-icon' src='img/user.png'/>
          <span data-cy='r-user' className='name'>{values.recipient}</span><span className='name'> is organizing this fundraiser</span>
        </div>
        <hr className='hr-1'/>
        <div className='descc'>
          <p data-cy='f-story'>{values.story}</p>
        </div>
        <hr/>

        
        {values.donations.length > 0 ? (
          <div>
            <h2>Donations made so far: </h2>
          </div>
        ):(<p></p>)}
        
        {
            values.donations
            .map(donation =>
              <div className='donated-container'>
                <img className='user-icon' src='img/user.png'/>
                {donation.isAnonymous ? (
                 
                     <span>Anonymous</span>
                
                ):( <span>{donation.userId.firstName} {donation.userId.lastName}</span>)}
                <p>Donated {donation.amount}birr</p>
                <hr/>
            </div>
            )}
      </div>
    </div>
  );
};

export default ViewFundDetails;
