import React, { useState, useEffect } from 'react';
import RenterList from './RenterList';
import ListingList from './ListingList';

const axios = require('axios');

const App = props => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ renters, setRenters ] = useState([]);
  const [ listings, setListings ] = useState([]);
  
  useEffect(() => {
    if (isLoading) {
      axios.get('/renters')
        .then(rentersInDB => {
          setRenters(rentersInDB.data);
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
      <RenterList renters={renters}/>
      <ListingList listings={listings}/>
    </div>
  );
};

export default App;