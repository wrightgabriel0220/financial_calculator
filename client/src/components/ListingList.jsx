import React from 'react';
import Listing from './Listing.jsx';

const ListingList = props => {
  return (
    <div id="listings-tab">
      <ul id="listing-list">
        {props.listings.map((listing, index) => (
          <Listing 
            update={props.update} 
            renters={props.renters} 
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