import React from 'react';
import Listing from './Listing.jsx';

const ListingList = props => {
  return (
    <div id="listings-tab">
      <table id="listing-list">
        {props.listings.map((listing, index) => <Listing listingData={listing} key={index}/>)}
      </table>
    </div>
  );
};

export default ListingList;