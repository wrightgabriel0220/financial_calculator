import React from 'react';
import RenterProfile from './RenterProfile';

const InfoTab = props => {
  return props.isHidden ? null : (
    <div id="info-tab">
      <RenterProfile 
        moveInCost={Number(Array.from(document.getElementsByClassName(`moveInCost${props.activeUser.name}`))[0].innerText.slice(1))} 
        listing={props.focusedListing}
        renter={props.activeUser} 
      />
    </div>
  );
};

export default InfoTab;