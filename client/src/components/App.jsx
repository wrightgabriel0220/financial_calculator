import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HostRegPage from './pages/HostRegPage';
import MemberRegPage from './pages/MemberRegPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RenterProfileSetupPage from './pages/RenterProfileSetupPage';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from './../actions.js';

const axios = require('axios');

const {doChangeRenterList, doChangeListingList, doChangeFocusedListing, doChangeMaxRent, doChangeActiveUser, doChangeActiveRenter} = actions;

const App = () => {
  const renters = useSelector(state => state.renters);
  const listings = useSelector(state => state.listings);
  const focusedListing = useSelector(state => state.focusedListing);
  const activeUser = useSelector(state => state.activeUser);
  const [ isLoading, setIsLoading ] = useState(activeUser ? true : false);
  const [ dashIsReady, setDashIsReady ] = useState(false);

  const dispatch = useDispatch();

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
        dispatch(doChangeFocusedListing(null));
      }
    }
  }, [listings]);

  useEffect(() => {
    if (activeUser === null) {
      dispatch(doChangeActiveRenter(null));
    } else {
      updateRenterList().then(updateListingList()).then(() => {
        setDashIsReady(true);
        setIsLoading(false); 
      }).catch(err => { 
        console.error(err);
      })
    }
  }, [activeUser]);

  useEffect(() => {
    dispatch(doChangeActiveRenter(renters.find(renter => renter.name === activeUser.first_name)));
  }, [renters])

  const logout = () => {
    dispatch(doChangeActiveUser(null));
    setDashIsReady(false);
  }

  const updateRenterList = () => {
    return axios.post('/renters/get', { groupCode: activeUser.group_code })
        .then(rentersInDB => {
          dispatch(doChangeRenterList(rentersInDB.data));
          return rentersInDB;
        })
        .then(rentersInDB => {
          if (rentersInDB.data.length !== 0) {
            dispatch(doChangeMaxRent(rentersInDB.data.map(renter => Math.round(renter.hourly_wages * renter.hours_working * 4.33333333333 * .3 -100)).reduce((a, b) => a + b)));
          } else {
            dispatch(doChangeRenterList([{ name: 'N/A', hourly_wages: 0, hours_working: 0, dog_count: 0, cat_count: 0, share: 0 }]));
          }
        })
  };

  const updateListingList = () => {
    return axios.get('/listings')
      .then(listingsInDB => {
        dispatch(doChangeListingList(listingsInDB.data));
      })
      .catch(err => {
        console.error(err);
      })
  };

  const focusListingById = id => { dispatch(doChangeFocusedListing(listings.filter(listing => listing.id === id)[0])) };

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
        <Navbar logout={logout} />
        <Switch>
          <Route exact path="/">
            {dashIsReady ? 
            (activeUser.has_logged_once ? <DashboardPage 
              updateRenterList={updateRenterList}
              updateListingList={updateListingList}
              focusListingById={focusListingById}
            /> : <RenterProfileSetupPage />) 
            : <HomePage />}
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
            <LoginPage login={ payload => { dispatch(doChangeActiveUser(payload)) } }/>
          </Route>
        </Switch>
      </div> 
    </Router>
  );
};

export default App;