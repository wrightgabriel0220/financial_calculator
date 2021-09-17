import React from 'react';
import RenterList from './../RenterList';
import ListingList from './../ListingList';
import AddRenter from './../AddRenter';
import AddListing from './../AddListing';
import Modal from './../Modal';
import InfoTab from './../InfoTab';

const DashboardPage = props => {
  return (
    <section id="dashboard">
      <Modal closeModal={props.setModalContent.bind(null, null)} modalContent={props.modalContent} />
      <div id="page-body">
        <section id="lists">
          <RenterList update={props.updateRenterList} maxRent={props.maxRent} renters={props.renters} setModalContent={props.setModalContent}/>
          <ListingList update={props.updateListingList} renters={props.renters} maxRent={props.maxRent} listings={props.listings} focusListing={ id => { props.focusListingById(id); } }/>
          <AddRenter update={props.updateRenterList} setModalContent={props.setModalContent} />
          <AddListing update={props.updateListingList} setModalContent={props.setModalContent} maxRent={props.maxRent} />
        </section>
        <InfoTab
          activeUser={props.activeUser} 
          activeRenter={props.activeRenter} 
          renters={props.renters} 
          update={props.updateListingList} 
          focusedListing={props.focusedListing} 
          isHidden={props.infoTabHidden}
        />
      </div>
    </section>
  );
};

export default DashboardPage;