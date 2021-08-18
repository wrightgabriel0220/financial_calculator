import React from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

const LoginPage = props => {
  const history = useHistory();

  const checkUsername = username => {
    return axios.get('/users')
      .then(results => {
        if (results.data.map(user => user.username).includes(username.trim())) {
          return true;
        } else {
         throw Error('Invalid username');
        }
      })
  };

  const attemptLogin = event => {
    event.preventDefault();

    let form = document.getElementById('login-form');
    if (form.checkValidity()) {
      let usernameInput = document.getElementById('username-input').value.trim();
      let passwordInput = document.getElementById('password-input').value.trim();
      checkUsername(usernameInput).then(() => {
        axios.get(`/users/${usernameInput}`)
        .then(userData => {
          bcrypt.compare(passwordInput, userData.data.rows[0].password, (err, result) => {
            if (err || result === false) {
              alert('Incorrect password. Try again!');
            } else {
              let user = userData.data.rows[0];
              delete user.password;
              delete user.username;
              props.login(user);
              history.push('/');
            }
          })
        })
      }).catch(err => {
        alert(err);
      })
    } else {
      form.reportValidity();
    }
  }

  return (
    <form id="login-form">
      <h2>Log in</h2>
      <label>Username:
        <input required type="text" id="username-input" className="form-element"></input>
      </label>
      <label>Password:
        <input required type="password" id="password-input" className="form-element"></input>
      </label>
      <button id="login-submit-button" onClick={attemptLogin}>Log In</button>
    </form>
  );
};

export default LoginPage;