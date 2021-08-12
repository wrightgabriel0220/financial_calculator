import React from 'react';

const AddRenterModal = props => {
  const submitHandler = event => {
    event.preventDefault();

    props.closeModal();
  }

  return (
    <form id="modal">
      <h2>Add Renter</h2>
      <label className="form-element"> Name:
        <input type="text"></input>
      </label>
      <label className="form-element"> Hourly Rate:
        <input type="text"></input>
      </label>
      <label className="form-element"> Hours Working:
        <input type="text"></input>
      </label>
      <label className="form-element"> # of Dogs:
        <input type="text"></input>
      </label>
      <label className="form-element"> # of Cats:
        <input type="text"></input>
      </label>
      <label className="form-element"> Share of Rent (decimal from 0 to 1):
        <input type="text"></input>
      </label>
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default AddRenterModal;