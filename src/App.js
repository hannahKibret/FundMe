import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Route, Routes,Link, NavLink} from 'react-router-dom'
import LoginForm from './LoginForm/Form';
import SignupForm from './SignupForm/Form';
import Home from './Home/Home';
import Eform from './EditForm/Eform';
import Fform from './FundraisingForm/Fform';
import ViewFundDetails from './ViewFundDetail/viewFundDetails';
import ViewFundDetails2 from './ViewFundDetails2/viewFundDetails2';
import ListFundraisers from './ViewFundraisers/listFundraisers';
import ListFundraisersRec from './ViewFundraisersRec/listFundraisers';
import FEform from './FundraisingEditForm/Fform';
import PersonalPage from './PersonalPage/personalPage';
import DonationPage from './DonationPage/donationPage';
import AdminPersonalPage from './AdminPersonalPage/personalPage';
import ListFundraisersAdm from './ViewFundraisersAdm/listFundraisers';
import CategoryPage from './Category/categoryPage';
import AllDonations from './AllDonations/donations';
function App() {
  return (

      <div className="App">
       
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<LoginForm/>}/>
          <Route exact path='/edit-account' element={<Eform/>}/>
          <Route exact path='/register' element={<SignupForm/>}/>
          <Route exact path='/post-fund' element={<Fform/>}/>
          <Route exact path='/edit-fund' element={<FEform/>}/>
          <Route exact path='/fund-acc' element={<PersonalPage/>}/>
          <Route exact path='/view-det' element={<ViewFundDetails2/>}/>
          <Route exact path='/view-detr' element={<ViewFundDetails/>}/>
          <Route exact path='/fund-lis' element={<ListFundraisers/>}/>
          <Route exact path='/fund-lisr' element={<ListFundraisersRec/>}/>
          <Route exact path='/fund-lisa' element={<ListFundraisersAdm/>}/>
          <Route exact path='/donate' element={<DonationPage/>}/>
          <Route exact path='/admin' element={<AdminPersonalPage/>}/>
          <Route exact path='/donations' element={<AllDonations/>}/>
          <Route exact path='/post-cat' element={<CategoryPage/>}/>
        </Routes> 
   
        
      </div>
  );
}

export default App;
