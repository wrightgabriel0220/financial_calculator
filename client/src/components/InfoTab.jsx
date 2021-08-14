import React from 'react';
import Listing from './Listing';

const InfoTab = props => {
  return props.isHidden ? null : (
    <div id="info-tab">
      {props.focusedListing ? 
        <ul>
          <Listing update={props.update} renters={props.renters} listingData={props.focusedListing} />
        </ul>
        :
        <div>Click on a listing to display related data</div>
      }
    </div>
  );
};

export default InfoTab;