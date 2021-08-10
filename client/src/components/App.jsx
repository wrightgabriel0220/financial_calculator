import React, { useState, useEffect } from 'react';
import RenterList from './RenterList';
import ListingList from './ListingList';
import AddRenter from './AddRenter';

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
          if (rentersInDB.data.length !== 0) {
            setMaxRent(rentersInDB.data.map(renter => Math.round(renter.hourly_wages * renter.hours_working*4.33333333333*.3 - 100)).reduce((a, b) => a + b));
          } else {
            setRenters([{ name: 'N/A', hourly_wages: 0, hours_working: 0, dog_count: 0, cat_count: 0, share: 0 }])
          }
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

  useEffect(() => {
    console.log(renters);
  }, [renters])

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
      <AddRenter />
    </div> 
  );
};

export default App;