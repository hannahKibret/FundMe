import React, {useState, useEffect} from 'react'
import './style.css'
import {useNavigate,useLocation} from 'react-router-dom'
import "../LoginForm/style/StForm.css";
import ListFundraisers from '../ViewFundraisers/listFundraisers';
const Home = () =>{

    const navigate = useNavigate()
    const location = useLocation()
   console.log(location.state)

    const onSignupClicked = () => {
        navigate('/register')
    }

    const onLogoutClicked = () => {
        navigate('/',{state:null})
    }

    const onAvatarClicked = () => {
        navigate('/fund-acc',{state:{token:location.state.token,firstName:location.state.firstName}})
    }
    const [FirstName,setFirstName] = useState('')

    useEffect(() => {
        if(location.state !== null){
            setFirstName(location.state.firstName.charAt(0).toUpperCase())
        }
    },[])

    return (
      <div>
       <div className='navbar-container'>
        <div className='navbar-components'>
            <img className='ime' src='img/Fundraising-Icon.png'/>
	  <div className='second-component'>
            {location.state === null?(
                <button className='signin-btn' data-cy = "signbtn" onClick={onSignupClicked}>Signup</button>
            ):(
                <div>
                    <button className='initials-btn' data-cy="pro-avatar" onClick = {onAvatarClicked} >{FirstName}</button>
                    <button className = 'signin-btn' data-cy='logout-btn' onClick = {onLogoutClicked}>Logout</button>
                </div>
            )}
	</div>
            </div>
            </div>
            <div className='top-container'>
            <div className='btn-header'>
                <h1>Get donations now</h1>
                <button className='fundd-btn'>Start a Fundraiser</button>
            </div>
            <div className='img-container'>
                <img className='fund-img' src='img/f1.jpg' alt='home page images'/>
            </div>
        </div>
        <div className='header'>
            <h1>Fundrising with us is easy</h1>
            <h1>it only taks a few minutes</h1>
        </div>
        <div className='row-numbers'>
            <div className='column-num'>
                <button className='num-btn'>1</button>
                <h3>Start with the basics</h3>
            </div>
            <div className='column-num'>
                <button className='num-btn'>2</button>
                <h3>Fill out the form</h3>
            </div>
            <div className='column-num'>
                <button className='num-btn'>3</button>
                <h3>Share your story</h3>
            </div>
        </div>
      
            <ListFundraisers location={location}/>
	
        </div>
    );
}

export default Home;