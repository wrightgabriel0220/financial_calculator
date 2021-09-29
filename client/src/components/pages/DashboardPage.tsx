import * as React from 'react';
import RenterList from '../RenterList';
import ListingList from '../ListingList';
import AddRenter from '../AddRenter';
import AddListing from '../AddListing';
import Modal from '../Modal';
import InfoTab from '../InfoTab';

const DashboardPage = props => {

  return (
    <section id="dashboard">
      <Modal />
      <div id="page-body">
        <section id="lists">
          <RenterList update={props.updateRenterList} />
          <ListingList update={props.updateListingList} focusListing={ id => { props.focusListingById(id); } }/>
          <AddRenter update={props.updateRenterList} />
          <AddListing update={props.updateListingList} />
        </section>
        <InfoTab />
      </div>
    </section>
  );
};

export default DashboardPage;