import * as React from 'react';
import * as PropTypes from 'prop-types';
import Listing from './Listing';
import { useAppSelector } from '../hooks';

const ListingList = ({ update, focusListing }) => {
  const renters = useAppSelector(state => state.renters);
  const listings = useAppSelector(state => state.listings);

  return (
    <div id="listings-tab">
      <ul id="listing-list">
        {listings.map((listing, index) => (
          <Listing
            update={update}
            renters={renters}
            listingData={listing}
            focusListing={focusListing}
            key={`${listing.name + index}`}
          />
        ))}
      </ul>
    </div>
  );
};

ListingList.propTypes = {
  update: PropTypes.func.isRequired,
  focusListing: PropTypes.func.isRequired,
};

export default ListingList;
