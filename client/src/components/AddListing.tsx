import * as React from 'react';
import AddListingModal from './modals/AddListingModal';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from './../hooks';
import actions from '../actions';

const AddListing = props => {
  const dispatch = useAppDispatch();
  
  const submitListing = listing => {
    if (listing.rent > useAppSelector(state => state.maxRent)) {
      console.log("Rent too high for this listing");
      return;
    }
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
    dispatch(actions.doChangeModalContent(<AddListingModal closeModal={dispatch.bind(null, actions.doChangeModalContent(null))} submitListing={submitListing}/>));
  };

  return (
    <button id="add-listing-button" onClick={addListing}>Add Listing</button>
  );
};

export default AddListing;