import React from 'react';
import Listing from './Listing.jsx';
import { useSelector } from 'react-redux';

const ListingList = props => {
  const renters = useSelector(state => state.renters);
  const listings = useSelector(state => state.listings);

  return (
    <div id="listings-tab">
      <ul id="listing-list">
        {listings.map((listing, index) => (
          <Listing 
            update={props.update} 
            renters={renters} 
            listingData={listing} 
            focusListing={props.focusListing} 
            key={index}
          />)
        )}
      </ul>
    </div>
  );
};

export default ListingList;