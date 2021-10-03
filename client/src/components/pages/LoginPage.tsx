import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom';

const LoginPage = ({ login }) => {
  const history = useHistory();

  const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

  const checkUsername = username => (
    axios.get('/users')
      .then(results => {
        if (results.data.map(user => user.username).includes(username.trim())) {
          return true;
        }
        throw Error('Invalid username');
      })
  );

  const attemptLogin = event => {
    event.preventDefault();

    const form: HTMLFormElement = document.getElementById('login-form') as HTMLFormElement;
    if (form.checkValidity()) {
      const usernameInput = getAndCastInputElementById('username-input').value.trim();
      const passwordInput = getAndCastInputElementById('password-input').value.trim();
      checkUsername(usernameInput).then(() => {
        axios.get(`/users/${usernameInput}`)
          .then(userData => {
            bcrypt.compare(passwordInput, userData.data.rows[0].password, (err, result) => {
              if (err || result === false) {
                alert('Incorrect password. Try again!');
              } else {
                const user = userData.data.rows[0];
                delete user.password;
                delete user.username;
                login(user);
                history.push('/');
              }
            });
          });
      }).catch(err => {
        alert(err);
      });
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="login-form">
      <h2>Log in</h2>
      <label htmlFor="username-input">
        Username:
        <input required type="text" id="username-input" className="form-element" />
      </label>
      <label htmlFor="password-input">
        Password:
        <input required type="password" id="password-input" className="form-element" />
      </label>
      <button type="submit" id="login-submit-button" onClick={attemptLogin}>Log In</button>
    </form>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginPage;
