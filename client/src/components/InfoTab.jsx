import React from 'react';
import RenterProfile from './RenterProfile';
import { useSelector } from 'react-redux';

const InfoTab = props => {
  const activeUser = useSelector(state => state.activeUser);
  const activeRenter = useSelector(state => state.activeRenter);
  const isHidden = useSelector(state => state.infoTabHidden);
  const focusedListing = useSelector(state => state.focusedListing);

  return isHidden ? null : (
    <div id="info-tab">
      <RenterProfile 
        moveInCost={Number(Array.from(document.getElementsByClassName(`moveInCost${activeRenter.name}`))[0].innerText.slice(1))} 
        listing={focusedListing}
        renter={activeRenter}
        activeUser={activeUser} 
      />
    </div>
  );
};

export default InfoTab;