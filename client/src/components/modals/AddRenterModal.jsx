import React from 'react';

const AddRenterModal = props => {
  const submitHandler = event => {
    event.preventDefault();

    props.closeModal();
  }

  return (
    <form id="modal">
      <div>This is the add renter modal form</div>
      <label> Name:
        <input type="text"></input>
      </label>
      <label> Hourly Rate:
        <input type="text"></input>
      </label>
      <label> Hours Working:
        <input type="text"></input>
      </label>
      <label> # of Dogs:
        <input type="text"></input>
      </label>
      <label> # of Cats:
        <input type="text"></input>
      </label>
      <label> Share of Rent (decimal from 0 to 1):
        <input type="text"></input>
      </label>
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default AddRenterModal;