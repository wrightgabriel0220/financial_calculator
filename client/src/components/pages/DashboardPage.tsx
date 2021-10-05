import * as React from 'react';
import * as PropTypes from 'prop-types';
import RenterList from '../RenterList';
import ListingList from '../ListingList';
import AddRenter from '../AddRenter';
import AddListing from '../AddListing';
import Modal from '../Modal';
import InfoTab from '../InfoTab';

const DashboardPage = ({ updateRenterList, updateListingList, focusListingById }) => (
  <section id="dashboard">
    <Modal />
    <div id="page-body">
      <section id="lists">
        <RenterList update={updateRenterList} />
        <ListingList update={updateListingList} focusListing={id => { focusListingById(id); }} />
        <AddRenter update={updateRenterList} />
        <AddListing update={updateListingList} />
      </section>
      <InfoTab />
    </div>
  </section>
);

DashboardPage.propTypes = {
  updateRenterList: PropTypes.func.isRequired,
  updateListingList: PropTypes.func.isRequired,
  focusListingById: PropTypes.func.isRequired,
};

export default DashboardPage;