import * as React from 'react';
import * as PropTypes from 'prop-types';

const LoginModal = ({ attemptLogin, closeModal }) => {
  const submitHandler = event => {
    event.preventDefault();
    const form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    if (form.checkValidity()) {
      if (attemptLogin((document.getElementById('renter-username') as HTMLInputElement).value)) {
        closeModal();
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
      <label htmlFor="renter-username">
        <input required id="renter-username" />
      </label>
      <button type="submit" id="login-submit" onClick={submitHandler}>Log In To This Renter Profile</button>
    </form>
  );
};

LoginModal.propTypes = {
  attemptLogin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
