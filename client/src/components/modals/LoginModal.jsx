import React from 'react';

const LoginModal = props => {
  const submitHandler = event => {
    event.preventDefault();
    let form = document.getElementById('modal');

    if (form.checkValidity()) {
      if (props.attemptLogin(document.getElementById('renter-username').value)) {
        props.closeModal();
      } else {
        console.log('Failed to login with this username. Check capitalization and try again?');
      }
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="modal">
      <h2>Renter Login</h2>
      <label>
        <input required id="renter-username"></input>
      </label>
      <button id="login-submit" onClick={submitHandler}>Log In To This Renter Profile</button>
    </form>
  );
};

export default LoginModal;