import * as React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

const MemberRegPage = () => {
  const history = useHistory();

  const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

  const checkUsername = username => (
    axios.get('/users')
      .then(results => {
        if (results.data.map(user => user.username).includes(username.trim())) {
          throw Error('username is already taken');
        } else {
          return true;
        }
      })
  );

  const checkGroupCode = groupcode => (
    axios.get('/groupcodes')
      .then(results => {
        if (results.data.map(codeObj => codeObj.group_code).includes(groupcode.trim())) {
          return true;
        }
        
        throw Error('not a valid group code');
      })
  );

  const handleRegistrationSubmit = event => {
    event.preventDefault();
    const usernameInput = getAndCastInputElementById('username-input').value;
    const groupCodeInput = getAndCastInputElementById('group-code-input').value;
    const form: HTMLFormElement = document.getElementById('registration-form') as HTMLFormElement;
    checkUsername(usernameInput).then(() => {
      checkGroupCode(groupCodeInput).then(() => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(getAndCastInputElementById('password-input').value, salt, (err2, hash) => {
              if (err2) {
                throw err2;
              } else {
                if (form.checkValidity()) {
                  axios.post('/users/register', {
                    username: usernameInput,
                    hashedPassword: hash,
                    firstName: getAndCastInputElementById('first-name-input').value,
                    groupCode: groupCodeInput,
                    isAdmin: false,
                    isHost: false,
                    has_logged_once: false,
                  }).then(() => {
                    history.push('/login');
                  }).catch(err3 => {
                    console.error(err3);
                  });
                }
                form.reportValidity();
              }
            });
          }
        });
      }).catch(err => {
        alert(err);
      });
    }).catch(err => {
      alert(err);
    });
  };

  return (
    <form id="registration-form">
      <h2>Register as Member</h2>
      <label htmlFor="username-input">
        Username*:
        <input required id="username-input" className="form-element" type="text" />
      </label>
      <label htmlFor="password-input">
        Password*:
        <input required id="password-input" className="form-element" type="password" />
      </label>
      <label htmlFor="first-name-input">
        First Name*:
        <input required id="first-name-input" className="form-element" type="text" />
      </label>
      <label htmlFor="group-code-input">
        Group Code*:
        <input required id="group-code-input" className="form-element" type="text" />
      </label>
      <button type="submit" id="submit-user-registration" onClick={handleRegistrationSubmit}>Register</button>
    </form>
  );
};

export default MemberRegPage;
