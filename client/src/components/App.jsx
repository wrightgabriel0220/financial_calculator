import React, { useState, useEffect } from 'react';
import RenterList from './RenterList';
import ListingList from './ListingList';
import AddRenter from './AddRenter';
import AddListing from './AddListing';
import Modal from './Modal';
import Navbar from './Navbar';
import InfoTab from './InfoTab';
import HostRegPage from './pages/HostRegPage';
import MemberRegPage from './pages/MemberRegPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const axios = require('axios');

const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ renters, setRenters ] = useState([]);
  const [ listings, setListings ] = useState([]);
  const [ focusedListing, setFocusedListing ] = useState(null);
  const [ maxRent, setMaxRent ] = useState(0);
  const [ modalContent, setModalContent ] = useState(null);
  const [ activeUser, setActiveUser ] = useState(null);
  const [ activeRenter, setActiveRenter ] = useState(null);
  const [ infoTabHidden, setInfoTabHidden ] = useState(true);

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
      setActiveRenter(renters.find(renter => renter.name === activeUser.first_name));
    }
  }, [activeUser]);

  const updateRenterList = () => {
    return axios.get('/renters')
        .then(rentersInDB => {
          setRenters(rentersInDB.data);
          return rentersInDB;
        })
        .then(rentersInDB => {
          if (rentersInDB.data.length !== 0) {
            setMaxRent(rentersInDB.data.map(renter => Math.round(renter.hourly_wages * renter.hours_working*4.33333333333*.3 - 100)).reduce((a, b) => a + b));
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
            <Modal closeModal={setModalContent.bind(null, null)} modalContent={modalContent} />
            <section id="page-body">
              <section id="lists">
                <RenterList update={updateRenterList} maxRent={maxRent} renters={renters} setModalContent={setModalContent}/>
                <ListingList update={updateListingList} renters={renters} maxRent={maxRent} listings={listings} focusListing={ id => { focusListingById(id); } }/>
                <AddRenter update={updateRenterList} setModalContent={setModalContent} />
                <AddListing update={updateListingList} setModalContent={setModalContent} />
              </section>
              <InfoTab activeRenter={activeRenter} renters={renters} update={updateListingList} focusedListing={focusedListing} isHidden={infoTabHidden} />
            </section>
            <div></div>
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