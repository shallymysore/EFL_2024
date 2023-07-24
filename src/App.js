import React, { useState, useEffect}  from 'react';
import './style.css';
import AllPlayers from './AllPlayers';
import Auction from './Auction';
import Teams from './Teams';
import Dailyscore from './Dailyscore';
import Login from './Login';
//import SetupTeams from './SetupTeams';
import ManageTeams from './ManageTeams';
import SubstitutePlayers from './SubstitutePlayers'
import Dashboard from './DailyscoreDashboard'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Linechart from './Linechart';
import Home from './Home';
import Livestats from './Livestats'




export default function App() {
  const timestamp = new Date();
  let diff ;
  const navigate = useNavigate()
  const [ipAddress, setIpAddress] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  
  const isMobile = window.innerWidth <= 600;

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Check if the user's IP address matches the allowed address
    console.log(ipAddress);
    if (ipAddress === '50.47.215.77' || ipAddress === '76.144.211.140') {

      setShowButtons(true);
    }else{
      setShowButtons(false);
    }
  }, [ipAddress]);

  /*
  const navigateToAuction = () => {
    //localStorage.removeItem('timestamp')
    const stored = localStorage.getItem('timestamp');

    if (stored) {
      const storedTime = new Date(stored);
      if (isNaN(storedTime)) {
        // handle invalid stored timestamp
        //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
        navigate('/login',{state:{previousurl:'/auction'}})
        return;
      }
      diff = (timestamp.getTime() - storedTime.getTime()) / 3600000;
      if (diff >= 24) {
        // navigate to login page if more than 24 hours
        //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
        navigate('/login',{state:{previousurl:'/auction'}})
        return;
      }
    } else {
      // navigate to login page if timestamp is missing
      //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
      navigate('/login',{state:{previousurl:'/auction'}})
      return;
    }

    // navigate to auction page if less than 24 hours
    //console.log("a",location.pathname)
    window.location.href = `${process.env.PUBLIC_URL}/#/auction`;
  };*/
  /*
  const navigateToOwners = () => {
    window.location.href = `${process.env.PUBLIC_URL}/#/owners`;
  };
  const navigateToDailyScore = () => {
    if(isMobile){
      window.location.href = `${process.env.PUBLIC_URL}/#/daily`;
    }
    else{
      window.location.href = `${process.env.PUBLIC_URL}/#/dailydashboard`;
    }
  };
  /*
  const navigateToSetupTeams = () => {
    //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
    navigate('/login',{state:{previousurl:'/SetupTeams'}})

  }*/
/*
  const navigateSubstitutePlayer = () => {
    //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
    navigate('/login',{state:{previousurl:'/SubstitutePlayers'}})

  }

  const navigateToManageTeams =() =>{
    navigate('/login',{state:{previousurl:'/ManageTeams'}})
  }*/
console.log(showButtons)
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<AllPlayers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/owners" element={<Teams />} />
          <Route path="/daily" element={<Dailyscore />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/SubstitutePlayers" element={<SubstitutePlayers />} />
          <Route path="/ManageTeams" element={<ManageTeams />}/>
          <Route path="/dailydashboard" element={<Dashboard />} />
          <Route path="/charts" element={<Linechart />} />
          <Route path="/livestats" element={<Livestats />} />
        </Routes>
    </div>
  );
}
