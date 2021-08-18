import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

const MemberRegPage = props => {
  const history = useHistory();

  const checkUsername = username => {
    return axios.get('/users')
      .then(results => {
        if (results.data.map(user => user.username).includes(username.trim())) {
          throw Error('username is already taken');
        } else {
          return true;
        }
      })
  };

  const checkGroupCode = groupcode => {
    return axios.get('/groupcodes')
      .then(results => {
        console.log(results.data);
        if (results.data.map(codeObj => codeObj.group_code).includes(groupcode.trim())) {
          return true;
        } else {
          throw Error('not a valid group code');
        }
      })
  }

  const handleRegistrationSubmit = event => {
    event.preventDefault();
    let usernameInput = document.getElementById('username-input').value;
    let groupCodeInput = document.getElementById('group-code-input').value;
    let form = document.getElementById('registration-form');
    checkUsername(usernameInput).then(() => {
      checkGroupCode(groupCodeInput).then(() => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(document.getElementById('password-input').value, salt, (err, hash) => {
              if (err) {
                throw err;
              } else {
                if (form.checkValidity()) {
                  axios.post('/users/register', {
                    username: usernameInput,
                    hashedPassword: hash,
                    firstName: document.getElementById('first-name-input'),
                    groupCode: groupCodeInput,
                    isAdmin: false,
                    isHost: false
                  }).then(() => {
                    history.push('/login');
                  }).catch(err => {
                    console.error(err);
                  });
                } else {
                  form.reportValidity();
                }
              }
            });
          }
        })
      }).catch(err => {
        alert(err);
      })
    }).catch(err => {
      alert(err);
    })
  };

  return (
    <form id="registration-form">
      <h2>Register as Member</h2>
      <label>Username*:
        <input required id="username-input" className="form-element" type="text"></input>
      </label>
      <label>Password*:
        <input required id="password-input" className="form-element" type="password"></input>
      </label>
      <label>First Name*:
        <input required id="first-name-input" className="form-element" type="text"></input>
      </label>
      <label>Group Code*:
        <input required id="group-code-input" className="form-element" type="text"></input>
      </label>
      <button id="submit-user-registration" onClick={handleRegistrationSubmit}>Register</button>
    </form>
  );
};

export default MemberRegPage;