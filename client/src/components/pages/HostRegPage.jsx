import React from 'react';

const HostRegPage = props => {
  const handleRegistrationSubmit = event => {
    event.preventDefault();
    
    console.log('registering user');
  }

  return (
    <form id="registration-form">
      <h2>Register as Host</h2>
      <label>Username:
        <input required type="text" id="username-input" className="form-element"></input>
      </label>
      <label>Password:
        <input required type="password" id="password-input" className="form-element"></input>
      </label>
      <button id="submit-user-registration" onClick={handleRegistrationSubmit}>Register</button>
    </form>
  );
};

export default HostRegPage;