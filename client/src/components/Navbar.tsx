import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReportIssueModal from './modals/ReportIssueModal';
import { useAppSelector, useAppDispatch } from '../hooks';
import actions from '../actions.js';

const Navbar = ({ logout }) => {
  const dispatch = useAppDispatch();

  const activeUser = useAppSelector(state => state.activeUser);
  const activeRenter = useAppSelector(state => state.activeRenter);
  const infoTabHidden = useAppSelector(state => state.infoTabHidden);

  const reportHandler = () => {
    dispatch(actions.doChangeModalContent(<ReportIssueModal />));
  };

  const seeHandler = () => {
    console.log('Displaying currently active issues');
  }

  const toggleInfoTabHidden = () => { dispatch(actions.doToggleInfoTabHidden(!infoTabHidden)); };

  if (activeUser) {
    return (
      <div id="navbar">
        <h1>HOUSECALC</h1>
        <span>
          Hello, {activeRenter ? activeRenter.name : 'New User'}!<br/>
          {activeUser.is_host ? <b>Group Code: {activeUser.group_code}</b> : null}
        </span>
        <span id="navbar-buttons">
          {activeUser.is_admin ? <button type="button" id="see-issues-button" onClick={seeHandler}>See Open Issues</button> : null}
          <button type="button" id="report-issue-button" onClick={reportHandler}>Report Issue</button>
          <button type="button" id="renter-profile-button" onClick={toggleInfoTabHidden}>
            Renter Profile
          </button>
          <button type="button" id="logout-button" onClick={logout}>Log Out</button>
        </span>
      </div>
    );
  }
  
  return (
    <div id="navbar">
      <h1>HOUSECALC</h1>
      <Link to="/register"><button type="button" id="register-button">Register</button></Link>
      <Link to="/login"><button type="button" id="login-button">Log In</button></Link>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
