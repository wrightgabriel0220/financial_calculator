import React from 'react';

const AddListingModal = props => {
  const submitHandler = event => {
    event.preventDefault();
  
    const form = document.getElementById('modal');
  
    if (form.checkValidity()) {
      props.submitListing({
        address: document.getElementById('address-input').value,
        rent: Number(document.getElementById('rent-input').value),
        summary: document.getElementById('summary-input').value,
        bedrooms: Number(document.getElementById('bedroom-count-input').value),
        bathrooms: Number(document.getElementById('bathroom-count-input').value),
        size: Number(document.getElementById('size-input').value),
        city: document.getElementById('city-input').value,
        dogDeposit: Number(document.getElementById('dog-deposit-input').value),
        catDeposit: Number(document.getElementById('cat-deposit-input').value)
      })
        .then(() => {
          props.closeModal();
        })
        .catch(err => {
          console.log('Failed to submit listing data! Try again');
        });
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="modal">
      <h2>Add Listing</h2>
      <label className="form-element"> Address:
        <input id="address-input" required type="text"></input>
      </label>
      <label className="form-element"> Rent:
        <input id="rent-input" required type="text"></input>
      </label>
      <label className="form-element"> Summary:
        <input id="summary-input" required type="text"></input>
      </label>
      <label className="form-element"> Bedrooms:
        <input id="bedroom-count-input" type="text"></input>
      </label>
      <label className="form-element"> Bathrooms:
        <input id="bathroom-count-input" type="text"></input>
      </label>
      <label className="form-element"> Size (in sqrft):
        <input id="size-input" type="text"></input>
      </label>
      <label className="form-element"> City:
        <input id="city-input" type="text"></input>
      </label>
      <label className="form-element"> Dog Deposit Cost:
        <input id="dog-deposit-input" type="text"></input>
      </label>
      <label className="form-element"> Cat Deposit Cost:
        <input id="cat-deposit-input" type="text"></input>
      </label>
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default AddListingModal;