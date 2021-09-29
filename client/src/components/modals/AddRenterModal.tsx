import * as React from 'react';

const AddRenterModal = props => {
  const submitHandler = event => {
    event.preventDefault();

    const form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    if (form.checkValidity()) {
      props.submitRenter({
        name: getAndCastInputElementById('name-input')?.value,
        hourly: Number(getAndCastInputElementById('hourly-rate-input')?.value),
        hours: Number(getAndCastInputElementById('hours-working-input')?.value),
        dogs: Number(getAndCastInputElementById('dog-count-input')?.value) || 0,
        cats: Number(getAndCastInputElementById('cat-count-input')?.value) || 0,
        percentageShare: Number(getAndCastInputElementById('share-input')?.value) || 0
      })
        .then(() => {
          props.closeModal();
        })
        .catch(err => {
          console.log('Failed to submit renter data! Try again');
        });
    } else {
      form.reportValidity();
    }
  }

  return (
    <form id="modal">
      <h2>Add Renter</h2>
      <label className="form-element"> Name:
        <input id="name-input" required type="text"></input>
      </label>
      <label className="form-element"> Hourly Rate:
        <input id="hourly-rate-input" required type="text"></input>
      </label>
      <label className="form-element"> Hours Working:
        <input id="hours-working-input" required type="text"></input>
      </label>
      <label className="form-element"> # of Dogs:
        <input id="dog-count-input" type="text"></input>
      </label>
      <label className="form-element"> # of Cats:
        <input id="cat-count-input" type="text"></input>
      </label>
      <label className="form-element"> Share of Rent (decimal from 0 to 1):
        <input disabled id="share-input" type="text"></input>
      </label>
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default AddRenterModal;