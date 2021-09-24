import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RenterProfileSetupPage = props => {
  const activeUser = useSelector(state => state.activeUser);

  const submitHandler = event => {
    event.preventDefault();

    let form = document.getElementById('renter-profile-setup-form');
    if (form.checkValidity()) {
      axios.post('/renters', {
        name: activeUser.first_name,
        hourly: document.getElementById('hourly-input').value,
        hours: document.getElementById('hours-input').value,
        dogs: document.getElementById('dog-count-input').value,
        cats: document.getElementById('cat-count-input').value,
        percentageShare: document.getElementById('share-input').value,
        groupCode: activeUser.group_code
      })
        .then(postResults => {
          console.log('postResults: ', postResults);
          axios.put('/renters/firstlog', { userId: activeUser.id }).then(firstLogUpdateResults => {
            console.log(firstLogUpdateResults);
          })
          .catch(err => {
            console.error(err);
          })
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      form.reportValidity();
    }
  }

  return (
    <section id="renter-profile-setup-page">
      <form id="renter-profile-setup-form">
        <label>Hourly Earnings:
          <input required type="text" id="hourly-input"></input>
        </label>
        <label>Hours Working (per week):
          <input required type="text" id="hours-input"></input>
        </label>
        <label># of Dogs:
          <input required type="text" id="dog-count-input"></input>
        </label>
        <label># of Cats:
          <input required type="text" id="cat-count-input"></input>
        </label>
        <label>Share of Rent (# btwn 1 and 100 inclusive):
          <input required type="text" id="share-input"></input>
        </label>
        <button type="submit" id="submit-renter-profile-button" onClick={submitHandler}>Submit</button>
      </form>
    </section>
  );
};

export default RenterProfileSetupPage;