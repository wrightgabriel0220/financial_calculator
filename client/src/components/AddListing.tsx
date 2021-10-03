import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import AddListingModal from './modals/AddListingModal';
import { useAppSelector, useAppDispatch } from '../hooks';
import actions from '../actions';

const AddListing = ({ update }) => {
  const dispatch = useAppDispatch();
  
  const submitListing = listing => {
    if (listing.rent > useAppSelector(state => state.maxRent)) {
      console.log('Rent too high for this listing');
      return null;
    }
    return axios.post('/listings', listing)
      .then(results => {
        update();
        return results;
      })
      .catch(err => err);
  };

  const addListing = () => {
    dispatch(actions.doChangeModalContent(
      <AddListingModal
        closeModal={() => { dispatch(actions.doChangeModalContent(null)); }}
        submitListing={submitListing}
        // TODO: Figure out why ESLint wants a comma here?????????!!!!!!!
      // eslint-disable-next-line comma-dangle
      />
    ));
  };

  return (
    <button type="submit" id="add-listing-button" onClick={addListing}>Add Listing</button>
  );
};

AddListing.propTypes = {
  update: PropTypes.func.isRequired,
};

export default AddListing;
