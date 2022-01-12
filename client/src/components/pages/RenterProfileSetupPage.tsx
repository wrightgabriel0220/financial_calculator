import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import { useAppSelector } from '../../hooks';

const RenterProfileSetupPage = ({ returnToDash }) => {
  const activeUser = useAppSelector(state => state.activeUser);

  const submitHandler = event => {
    event.preventDefault();

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    const form: HTMLFormElement = document.getElementById('renter-profile-setup-form') as HTMLFormElement;
    if (form.checkValidity()) {
      axios.post('/renters', {
        name: activeUser.first_name,
        hourly: getAndCastInputElementById('hourly-input').value,
        hours: getAndCastInputElementById('hours-input').value,
        dogs: getAndCastInputElementById('dog-count-input').value,
        cats: getAndCastInputElementById('cat-count-input').value,
        percentageShare: getAndCastInputElementById('share-input').value,
        groupCode: activeUser.group_code,
      })
        .then(postResults => {
          console.log('postResults: ', postResults);
          axios.put('/users/firstlog', { userId: activeUser.id }).then(firstLogUpdateResults => {
            console.log('firstLogUpdateResults route successfully requested');
            console.log('firstLogUpdateResults: ', firstLogUpdateResults);
            returnToDash();
          })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      form.reportValidity();
    }
  };

  return (
    <section id="renter-profile-setup-page">
      <h2>Set Up Your Renter Profile</h2> 
      <form id="renter-profile-setup-form">
        <label htmlFor="hourly-input">
          Hourly Earnings:
          <input required type="text" id="hourly-input" />
        </label><br/>
        <label htmlFor="hours-input">
          Hours Working (per week):
          <input required type="text" id="hours-input" />
        </label><br/>
        <label htmlFor="dog-count-input">
          # of Dogs:
          <input required type="text" id="dog-count-input" />
        </label><br/>
        <label htmlFor="cat-count-input">
          # of Cats:
          <input required type="text" id="cat-count-input" />
        </label><br/>
        <label htmlFor="share-input">
          Share of Rent (# btwn 1 and 100 inclusive):
          <input required type="text" id="share-input" />
        </label><br/>
        <button type="submit" id="submit-renter-profile-button" onClick={submitHandler}>Submit</button>
      </form>
    </section>
  );
};

RenterProfileSetupPage.propTypes = {
  returnToDash: PropTypes.func.isRequired
};

export default RenterProfileSetupPage;
