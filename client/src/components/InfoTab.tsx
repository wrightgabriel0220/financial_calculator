import * as React from 'react';
import * as PropTypes from 'prop-types';
import RenterProfile from './RenterProfile';
import { useAppDispatch, useAppSelector } from '../hooks';
import EditRenterModal from './modals/EditRenterModal';
import actions from '../actions';

const InfoTab = ({ editProfile }) => {
  const dispatch = useAppDispatch();

  const activeUser = useAppSelector(state => state.activeUser);
  const activeRenter = useAppSelector(state => state.activeRenter);
  const isHidden = useAppSelector(state => state.infoTabHidden);
  const focusedListingId = useAppSelector(state => state.focusedListingId);
  const listings = useAppSelector(state => state.listings);

  const editProfileHandler = () => {
    dispatch(
      actions.doChangeModalContent(
        <EditRenterModal 
          renterData={activeRenter} 
          changeRenter={editProfile} 
          closeModal={() => { dispatch(actions.doChangeModalContent(null)) }} 
        />
      )
    );
  }

  return isHidden ? null : (
    <div id="info-tab">
      {listings[0] ?<RenterProfile
        moveInCost={
          Number(
            Array.from(document.getElementsByClassName(`moveInCost${activeRenter.name}`))[0]?.textContent?.slice(1),
          ) || 0
        }
        listing={listings.find(listing => listing.id === focusedListingId)}
        renter={activeRenter}
        activeUser={activeUser}
      /> : 'There is no info to display. Try adding a listing!'}
      <button type="button" id="edit-renter-profile-button" onClick={editProfileHandler}>
        Edit Your Renter Profile
      </button>
    </div>
  );
};

InfoTab.propTypes = {
  editProfile: PropTypes.func.isRequired,
};

export default InfoTab;
