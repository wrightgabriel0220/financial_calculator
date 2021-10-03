import * as React from 'react';
import * as PropTypes from 'prop-types';

const AddRenterModal = ({ submitRenter, closeModal }) => {
  const submitHandler = event => {
    event.preventDefault();

    const form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    if (form.checkValidity()) {
      submitRenter({
        name: getAndCastInputElementById('name-input')?.value,
        hourly: Number(getAndCastInputElementById('hourly-rate-input')?.value),
        hours: Number(getAndCastInputElementById('hours-working-input')?.value),
        dogs: Number(getAndCastInputElementById('dog-count-input')?.value) || 0,
        cats: Number(getAndCastInputElementById('cat-count-input')?.value) || 0,
        percentageShare: Number(getAndCastInputElementById('share-input')?.value) || 0,
      })
        .then(() => {
          closeModal();
        })
        .catch(() => {
          console.log('Failed to submit renter data! Try again');
        });
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="modal">
      <h2>Add Renter</h2>
      <label htmlFor="name-input" className="form-element">
        Name:
        <input id="name-input" required type="text" />
      </label>
      <label htmlFor="hourly-rate-input" className="form-element">
        Hourly Rate:
        <input id="hourly-rate-input" required type="text" />
      </label>
      <label htmlFor="hours-working-input" className="form-element">
        Hours Working:
        <input id="hours-working-input" required type="text" />
      </label>
      <label htmlFor="dog-count-input" className="form-element">
        # of Dogs:
        <input id="dog-count-input" type="text" />
      </label>
      <label htmlFor="cat-count-input" className="form-element">
        # of Cats:
        <input id="cat-count-input" type="text" />
      </label>
      <label htmlFor="share-input" className="form-element">
        Share of Rent (decimal from 0 to 1):
        <input disabled id="share-input" type="text" />
      </label>
      <button type="submit" onClick={submitHandler}>Submit</button>
    </form>
  );
};

AddRenterModal.propTypes = {
  submitRenter: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddRenterModal;
