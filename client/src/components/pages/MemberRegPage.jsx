import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const MemberRegPage = props => {
  const handleRegistrationSubmit = event => {
    event.preventDefault();

    let form = document.getElementById('registration-form');
    if (form.checkValidity()) {
      /*axios.post('/users/register',*/ console.log({
        username: document.getElementById('username-input').value,
        hashedPassword: bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(document.getElementById('password-input').value, salt, (err, hash) => {
              if (err) {
                throw err;
              } else {
                return hash;
              }
            });
          }
        }),
        groupCode: document.getElementById('group-code-input').value,
        isAdmin: false,
        isHost: false
      });
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="registration-form">
      <h2>Register as Member</h2>
      <label>Username:
        <input required id="username-input" className="form-element" type="text"></input>
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