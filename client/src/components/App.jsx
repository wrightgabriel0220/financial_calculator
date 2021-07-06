import React, { useState, useEffect } from 'react';
import RenterList from './RenterList';
import ListingList from './ListingList';

const axios = require('axios');

const App = props => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ renters, setRenters ] = useState([]);
  const [ listings, setListings ] = useState([]);
  const [ maxRent, setMaxRent ] = useState(0);
  
  useEffect(() => {
    if (isLoading) {
      axios.get('/renters')
        .then(rentersInDB => {
          setRenters(rentersInDB.data);
          return rentersInDB;
        })
        .then(rentersInDB => {
          setMaxRent(rentersInDB.data.map(renter => Math.round(renter.hourly_wages * renter.hours_working*4.33333333333*.3 - 100)).reduce((a, b) => a + b));
        })
        .then(() => {
          axios.get('/listings')
            .then(listingsInDB => {
              setListings(listingsInDB.data);
            })
            .then(() => {
              setIsLoading(false);
            })
            .catch(err => {
              console.error(err);
            })
        })
        .catch(err => {
          console.error(err);
        })
    } else {}
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
      <RenterList maxRent={maxRent} renters={renters}/>
      <ListingList renters={renters} maxRent={maxRent} listings={listings}/>
    </div> 
  );
};

export default App;