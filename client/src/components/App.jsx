import React, { useState, useEffect } from 'react';
import RenterList from './RenterList';
import ListingList from './ListingList';
import AddRenter from './AddRenter';
import AddListing from './AddListing';
import Modal from './Modal';

const axios = require('axios');

const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ renters, setRenters ] = useState([]);
  const [ listings, setListings ] = useState([]);
  const [ maxRent, setMaxRent ] = useState(0);
  const [ modalContent, setModalContent ] = useState(null);

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
  
  useEffect(() => {
    if (isLoading) {
      updateRenterList().then(updateListingList()).then(() => { setIsLoading(false); }).catch(err => {
        console.error(err);
      })
    }
  }, []);

  if (isLoading) {
    return (
      <div id="app-body">
        Loading...
      </div>
    )
  }

  return (
    <div id="app-body">
      <Modal closeModal={setModalContent.bind(null, null)} modalContent={modalContent} />
      <RenterList update={updateRenterList} maxRent={maxRent} renters={renters} setModalContent={setModalContent}/>
      <ListingList update={updateListingList} renters={renters} maxRent={maxRent} listings={listings} />
      <AddRenter update={updateRenterList} setModalContent={setModalContent} />
      <AddListing update={updateListingList} setModalContent={setModalContent} />
    </div> 
  );
};

export default App;