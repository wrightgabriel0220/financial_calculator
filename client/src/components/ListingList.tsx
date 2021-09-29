import * as React from 'react';
import Listing from './Listing';
import { useAppSelector } from './../hooks';

const ListingList = props => {
  const renters = useAppSelector(state => state.renters);
  const listings = useAppSelector(state => state.listings);

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