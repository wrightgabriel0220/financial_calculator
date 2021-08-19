import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HostRegPage from './pages/HostRegPage';
import MemberRegPage from './pages/MemberRegPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const axios = require('axios');

const App = () => {
  const [ renters, setRenters ] = useState([]);
  const [ listings, setListings ] = useState([]);
  const [ focusedListing, setFocusedListing ] = useState(null);
  const [ maxRent, setMaxRent ] = useState(0);
  const [ modalContent, setModalContent ] = useState(null);
  const [ activeUser, setActiveUser ] = useState(null);
  const [ activeRenter, setActiveRenter ] = useState(null);
  const [ infoTabHidden, setInfoTabHidden ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(activeUser ? true : false);
  const [ dashIsReady, setDashIsReady ] = useState(false);

  useEffect(() => {
    if (isLoading) {
      updateRenterList().then(updateListingList()).then(() => { setIsLoading(false); }).catch(err => {
        console.error(err);
      })
    }
  }, []);

  useEffect(() => {
    if (focusedListing) {
      if (listings.filter(listing => listing.address === focusedListing.address).length === 0) {
        setFocusedListing(null);
      }
    }
  }, [listings]);

  useEffect(() => {
    if (activeUser === null) {
      setActiveRenter(null);
    } else {
      console.log('first-name: ', activeUser.first_name);
      updateRenterList().then(updateListingList()).then(() => {
        setDashIsReady(true);
        setIsLoading(false); 
      }).catch(err => { 
        console.error(err); 
      })
      setActiveRenter(renters.find(renter => renter.name === activeUser.first_name));
    }
  }, [activeUser]);

  const updateRenterList = () => {
    return axios.post('/renters/get', { groupCode: activeUser.group_code })
        .then(rentersInDB => {
          console.log(rentersInDB);
          setRenters(rentersInDB.data);
          return rentersInDB;
        })
        .then(rentersInDB => {
          if (rentersInDB.data.length !== 0) {
            setMaxRent(rentersInDB.data.map(renter => Math.round(renter.hourly_wages * renter.hours_working * 4.33333333333 * .3 - 100)).reduce((a, b) => a + b));
          } else {
            setRenters([{ name: 'N/A', hourly_wages: 0, hours_working: 0, dog_count: 0, cat_count: 0, share: 0 }])
          }
        })
  };

  const updateListingList = () => {
    return axios.get('/listings')
      .then(listingsInDB => {
        setListings(listingsInDB.data);
      })
      .catch(err => {
        console.error(err);
      })
  };

  const focusListingById = id => { setFocusedListing(listings.filter(listing => listing.id === id)[0]); };

  if (isLoading) {
    return (
      <div id="app-body">
        Loading...
      </div>
    )
  }

  return (
    <Router>
      <div id="app-body">
        <Navbar
          toggleInfoTab={setInfoTabHidden.bind(null, !infoTabHidden)}
          logout={setActiveUser.bind(null, null)} 
          activeRenter={activeRenter} 
          setModalContent={setModalContent}/>
        <Switch>
          <Route exact path="/">
            {dashIsReady ? <DashboardPage 
              updateRenterList={updateRenterList}
              updateListingList={updateListingList}
              maxRent={maxRent}
              renters={renters}
              setModalContent={setModalContent}
              listings={listings}
              focusListingById={focusListingById}
              infoTabHidden={infoTabHidden}
              focusedListing={focusedListing}
              modalContent={modalContent}
              activeRenter={activeRenter}
            /> : <HomePage />}
          </Route>
          <Route exact path="/register">
            <h2 id="group-code-question">
              Are you registering as a <Link to="/register/host">group host</Link> or <Link to="/register/member">group member</Link>?
            </h2>
          </Route>
          <Route exact path="/register/host">
            <HostRegPage />
          </Route>
          <Route exact path="/register/member">
            <MemberRegPage />
          </Route>
          <Route path="/login">
            <LoginPage login={setActiveUser}/>
          </Route>
        </Switch>
      </div> 
    </Router>
  );
};

export default App;