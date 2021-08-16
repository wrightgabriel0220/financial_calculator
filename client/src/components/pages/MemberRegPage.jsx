import React from 'react';

const MemberRegPage = props => {
  const handleRegistrationSubmit = event => {
    event.preventDefault();

    console.log('registering user');
  };

  return (
    <form id="registration-form">
      <h2>Register as Member</h2>
      <label>Username:
        <input required id="text-input" className="form-element" type="text"></input>
      </label>
      <label>Password:
        <input required id="password-input" className="form-element" type="password"></input>
      </label>
      <label>Group Code:
        <input required id="group-code-input" className="form-element" type="text"></input>
      </label>
      <button id="submit-user-registration" onClick={handleRegistrationSubmit}>Register</button>
    </form>
  );
};

export default MemberRegPage;