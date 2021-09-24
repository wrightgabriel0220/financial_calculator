import React from 'react';
import ReportIssueModal from './modals/ReportIssueModal';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from './../actions.js';

const Navbar = props => {
  const dispatch = useDispatch();

  const activeRenter = useSelector(state => state.activeRenter);
  const infoTabHidden = useSelector(state => state.infoTabHidden);

  const reportHandler = () => {
    dispatch(actions.doChangeModalContent(<ReportIssueModal />));
  };

  if (activeRenter) {
    return (
      <div id="navbar">
        <h1>HOUSECALC</h1>
        <span>Hello, {activeRenter.name}!</span>
        <span id="navbar-buttons">
          <button id="report-issue-button" onClick={reportHandler}>Report Issue</button>
          <button id="renter-profile-button" onClick={dispatch.bind(null, actions.doToggleInfoTabHidden(!infoTabHidden))}>Renter Profile</button>
          <button id="logout-button" onClick={props.logout}>Log Out</button>
        </span>
      </div>
    )
  } else {
    return (
      <div id="navbar">
        <h1>HOUSECALC</h1>
        <button id="report-issue-button" onClick={reportHandler}>Report Issue</button>
        <Link to="/register"><button id="register-button">Register</button></Link>
        <Link to="/login"><button id="login-button">Log In</button></Link>
      </div>
    );
  }
};

export default Navbar;