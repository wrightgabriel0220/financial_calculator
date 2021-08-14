import React from 'react';
import LoginModal from './modals/LoginModal';

const Navbar = props => {
  const loginHandler = () => {
    props.setModalContent(<LoginModal attemptLogin={props.attemptLogin} closeModal={props.setModalContent.bind(null, null)}/>);
  };

  if (props.activeUser) {
    return (
      <div id="navbar">
        <h1>FINCALC</h1>
        <span>Hello, {props.activeUser.name}!</span>
        <span id="navbar-buttons">
          <button id="renter-profile-button">Renter Profile</button>
          <button id="logout-button" onClick={props.logout}>Log Out</button>
        </span>
      </div>
    )
  } else {
    return (
      <div id="navbar">
        <h1>FINCALC</h1>
        <button id="login-button" onClick={loginHandler}>Log In</button>
      </div>
    );
  }
};

export default Navbar;