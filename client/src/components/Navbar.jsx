import React from 'react';
import LoginModal from './modals/LoginModal';
import ReportIssueModal from './modals/ReportIssueModal';
import { Link } from 'react-router-dom';

const Navbar = props => {
  const reportHandler = () => {
    props.setModalContent(<ReportIssueModal closeModal={props.setModalContent.bind(null, null)}/>);
  }

  if (props.activeRenter) {
    return (
      <div id="navbar">
        <h1>FINCALC</h1>
        <span>Hello, {props.activeRenter.name}!</span>
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
        <Link to="/register"><button id="register-button">Register</button></Link>
        <Link to="/login"><button id="login-button">Log In</button></Link>
      </div>
    );
  }
};

export default Navbar;