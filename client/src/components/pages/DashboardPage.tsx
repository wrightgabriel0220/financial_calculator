import * as React from 'react';
import * as PropTypes from 'prop-types';
import RenterList from '../RenterList';
import ListingList from '../ListingList';
import AddListing from '../AddListing';
import Modal from '../Modal';
import InfoTab from '../InfoTab';

const DashboardPage = ({ updateRenterList, updateListingList, focusListingById, editProfile }) => (
  <section id="dashboard">
    <Modal />
    <div id="page-body">
      <section id="lists">
        <RenterList update={updateRenterList} />
        <ListingList update={updateListingList} focusListing={id => { focusListingById(id); }} />
        <AddListing update={updateListingList} />
      </section>
      <InfoTab editProfile={editProfile}/>
    </div>
  </section>
);

DashboardPage.propTypes = {
  updateRenterList: PropTypes.func.isRequired,
  updateListingList: PropTypes.func.isRequired,
  focusListingById: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
};

export default DashboardPage;
