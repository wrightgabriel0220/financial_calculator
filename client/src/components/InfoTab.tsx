import * as React from 'react';
import RenterProfile from './RenterProfile';
import { useAppSelector } from '../hooks';

const InfoTab = () => {
  const activeUser = useAppSelector(state => state.activeUser);
  const activeRenter = useAppSelector(state => state.activeRenter);
  const isHidden = useAppSelector(state => state.infoTabHidden);
  const focusedListing = useAppSelector(state => state.focusedListing);

  return isHidden ? null : (
    <div id="info-tab">
      <RenterProfile
        moveInCost={
          Number(
            Array.from(document.getElementsByClassName(`moveInCost${activeRenter.name}`))[0].textContent?.slice(1),
          ) || 0
        }
        listing={focusedListing}
        renter={activeRenter}
        activeUser={activeUser}
      />
    </div>
  );
};

export default InfoTab;
