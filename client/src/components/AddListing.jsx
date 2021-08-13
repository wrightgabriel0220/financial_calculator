import React from 'react';
import AddListingModal from './modals/AddListingModal';
import axios from 'axios';

const AddListing = props => {
  const submitListing = listing => {
    return axios.post('/listings', listing)
      .then(results => {
        props.update();
        return results;
      })
      .catch(err => {
        return err;
      })
  };

  const addListing = () => {
    props.setModalContent(<AddListingModal closeModal={props.setModalContent.bind(null, null)} submitListing={submitListing}/>)
  };

  return (
    <button id="add-listing-button" onClick={addListing}>Add Listing</button>
  );
};

export default AddListing;