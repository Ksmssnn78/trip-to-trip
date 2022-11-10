import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import Register from './RegisterPage/RegisterPage';
import SignIn from './SignIn/SignIn';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Home/Home';
import Community from './Community/Community';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import AboutUs from './AboutUs/AboutUs';
import SpecialDeal from './SpecialDeal/SpecialDeal';
import Admin from './Admin/Admin';
import Profile from './Profile/Profile';
import { auth } from './Firebase/config';

function App() {

  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);


  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Discover" element={<DiscoverPage />} />
          <Route exact path='/Community' element={<Community />} />
          <Route exact path='/SpecialDeal' element={<SpecialDeal />} />
          <Route exact path='/AboutUs' element={<AboutUs />} />
          <Route exact path='/SignIn' element={<SignIn />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/Admin' element={<Admin />} />
          <Route exact path='/Profile' element={<Profile name={userName}/>} />
          <Route exact path='/' element={<Home />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
