import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const HostRegPage = props => {
  const generateGroupCode = (length, cb) => {
    let charList = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let groupCode = '';

    while (groupCode.length < length) {
      groupCode += charList[Math.floor(Math.random() * charList.length)];
    }
    return axios.get('/groupcodes')
      .then(results => {
        if (results.data.includes(groupCode)) {
          return generateGroupCode();
        } else {
          cb(groupCode);
        }
      })
      .catch(err => {
        throw err;
      })
  };

  const checkUsername = username => {
    return axios.get('/users')
      .then(results => {
        console.log('userlist: ', results.data);
        if (results.data.map(user => user.username).includes(username.trim())) {
          return false;
        } else {
          return true;
        }
      })
  };

  const handleRegistrationSubmit = event => {
    event.preventDefault();

    let form = document.getElementById('registration-form');
    let usernameInput = document.getElementById('username-input').value;
    if (!checkUsername(usernameInput)) {
      alert('That username is already taken. Please try again.');
      return;
    }
    let hashedPass = '';

    checkUsername(usernameInput).then(isValidUsername => {
      if (isValidUsername) {
        if (form.checkValidity()) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            } else {
              return bcrypt.hash(document.getElementById('password-input').value, salt, (err, hash) => {
                if (err) {
                  throw err;
                } else {
                  hashedPass = hash;
                  generateGroupCode(12, code => {
                    axios.post('/users/register', {
                      username: document.getElementById('username-input').value,
                      hashedPassword: hashedPass,
                      groupCode: code,
                      isAdmin: false,
                      isHost: true
                    });
                  })
                }
              });
            }
          });
        } else {
          form.reportValidity();
        }
      } else {
        alert('That username is already taken. Please try again.');
        return;
      }
    }).catch(err => {
      console.error(err);
    });
  };

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