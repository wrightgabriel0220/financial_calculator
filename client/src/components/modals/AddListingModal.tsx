import * as React from 'react';
import * as PropTypes from 'prop-types';

const AddListingModal = ({ submitListing, closeModal }) => {
  const submitHandler = (event) => {
    event.preventDefault();
  
    const form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById: Function = (id: string) => document.getElementById(id) as HTMLInputElement;
  
    if (form.checkValidity()) {
      submitListing({
        address: getAndCastInputElementById('address-input')?.value as string,
        rent: Number(getAndCastInputElementById('rent-input')?.value) as number,
        summary: getAndCastInputElementById('summary-input')?.value as string,
        bedrooms: Number(getAndCastInputElementById('bedroom-count-input')?.value) as number,
        bathrooms: Number(getAndCastInputElementById('bathroom-count-input')?.value) as number,
        size: Number(getAndCastInputElementById('size-input')?.value) as number,
        city: getAndCastInputElementById('city-input')?.value as string,
        dogDeposit: Number(getAndCastInputElementById('dog-deposit-input')?.value) as number,
        catDeposit: Number(getAndCastInputElementById('cat-deposit-input')?.value) as number,
      })
        .then(() => {
          closeModal();
        })
        .catch(err => {
          console.log('Failed to submit listing data! Try again');
          console.error(`ERROR: ${err}`);
        });
    } else {
      form.reportValidity();
    }
  };
  
  return (
    <form id="modal">
      <h2>Add Listing</h2>
      <label htmlFor="address-input" className="form-element">
        Address:
        <input id="address-input" required type="text" />
      </label>
      <label htmlFor="rent-input" className="form-element">
        Rent:
        <input id="rent-input" required type="text" />
      </label>
      <label htmlFor="summary-input" className="form-element">
        Summary:
        <input id="summary-input" required type="text" />
      </label>
      <label htmlFor="bedroom-count-input" className="form-element">
        Bedrooms:
        <input id="bedroom-count-input" type="text" />
      </label>
      <label htmlFor="bathroom-count-input" className="form-element">
        Bathrooms:
        <input id="bathroom-count-input" type="text" />
      </label>
      <label htmlFor="size-input" className="form-element">
        Size (in sqrft):
        <input id="size-input" type="text" />
      </label>
      <label htmlFor="city-input" className="form-element">
        City:
        <input id="city-input" type="text" />
      </label>
      <label htmlFor="dog-deposit-input" className="form-element">
        Dog Deposit Cost:
        <input id="dog-deposit-input" type="text" />
      </label>
      <label htmlFor="cat-deposit-input" className="form-element">
        Cat Deposit Cost:
        <input id="cat-deposit-input" type="text" />
      </label>
      <button type="submit" onClick={submitHandler}>Submit</button>
    </form>
  );
};

AddListingModal.propTypes = {
  submitListing: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddListingModal;
