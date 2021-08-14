import React from 'react';
import LoginModal from './modals/LoginModal';
import ReportIssueModal from './modals/ReportIssueModal';

const Navbar = props => {
  const loginHandler = () => {
    props.setModalContent(<LoginModal attemptLogin={props.attemptLogin} closeModal={props.setModalContent.bind(null, null)}/>);
  };

  const reportHandler = () => {
    props.setModalContent(<ReportIssueModal closeModal={props.setModalContent.bind(null, null)}/>);
  }

  if (props.activeUser) {
    return (
      <div id="navbar">
        <h1>FINCALC</h1>
        <span>Hello, {props.activeUser.name}!</span>
        <span id="navbar-buttons">
          <button id="report-issue-button" onClick={reportHandler}>Report Issue</button>
          <button id="renter-profile-button" onClick={props.toggleInfoTab}>Renter Profile</button>
          <button id="logout-button" onClick={props.logout}>Log Out</button>
        </span>
      </div>
    )
  } else {
    return (
      <div id="navbar">
        <h1>FINCALC</h1>
        <button id="report-issue-button" onClick={reportHandler}>Report Issue</button>
        <button id="login-button" onClick={loginHandler}>Log In</button>
      </div>
    );
  }
};

export default Navbar;