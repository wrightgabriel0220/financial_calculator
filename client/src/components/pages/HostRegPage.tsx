import * as React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

const HostRegPage = () => {
  const history = useHistory();

  const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;
  
  const generateGroupCode = (length, cb) => {
    const charList = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let groupCode = '';

    while (groupCode.length < length) {
      groupCode += charList[Math.floor(Math.random() * charList.length)];
    }
    return axios.get('/groupcodes')
      .then(results => {
        if (results.data.includes(groupCode)) {
          return generateGroupCode(length, cb);
        }
        
        // TODO: Adjust how this is called to use a return instead of a callback; it should not have to return null
        cb(groupCode);
        return null;
      })
      .catch(err => {
        throw err;
      });
  };

  const checkUsername = username => (
    axios.get('/users')
      .then(results => {
        if (results.data.map(user => user.username).includes(username.trim())) {
          return false;
        }

        return true;
      })
  );

  const handleRegistrationSubmit = event => {
    event.preventDefault();

    const form: HTMLFormElement = document.getElementById('registration-form') as HTMLFormElement;
    const usernameInput = getAndCastInputElementById('username-input').value;
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
              return bcrypt.hash(getAndCastInputElementById('password-input').value, salt, (err2, hash) => {
                if (err) {
                  throw err;
                } else {
                  hashedPass = hash;
                  generateGroupCode(12, code => {
                    axios.post('/users/register', {
                      username: usernameInput,
                      hashedPassword: hashedPass,
                      firstName: getAndCastInputElementById('first-name-input').value,
                      groupCode: code,
                      isAdmin: false,
                      isHost: true,
                      has_logged_once: false,
                    }).then(() => {
                      history.push('/login');
                    }).catch(err3 => {
                      console.error(err3);
                    });
                  });
                }
              });
            }
          });
        } else {
          form.reportValidity();
        }
      } else {
        alert('That username is already taken. Please try again.');
      }
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <form id="registration-form">
      <h2>Register as Host</h2>
      <label htmlFor="username-input">
        Username*:
        <input required type="text" id="username-input" className="form-element" />
      </label>
      <label htmlFor="password-input">
        Password*:
        <input required type="password" id="password-input" className="form-element" />
      </label>
      <label htmlFor="first-name-input">
        First Name*:
        <input required type="text" id="first-name-input" className="form-element" />
      </label>
      <button type="submit" id="submit-user-registration" onClick={handleRegistrationSubmit}>Register</button>
      <sub>*: indicates that a field is required</sub>
    </form>
  );
};

export default HostRegPage;
