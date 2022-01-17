import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useAppSelector } from '../../hooks';

const EditRenterModal = ({ changeRenter, closeModal, renterData }) => {
  const activeUser = useAppSelector(state => state.activeUser);

  const submitHandler = event => {
    event.preventDefault();

    const form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    if (form.checkValidity()) {
      changeRenter({
        name: getAndCastInputElementById('name-input').value,
        hourly: getAndCastInputElementById('hourly-wages-input').value,
        hours: getAndCastInputElementById('hours-working-input').value,
        dogs: getAndCastInputElementById('dog-count-input').value || 0,
        cats: getAndCastInputElementById('cat-count-input').value || 0,
        share: getAndCastInputElementById('share-input').value || 0,
      }, renterData);
    } else {
      form.reportValidity();
    }

    closeModal();
  };

  return (
    <form id="modal">
      <h2>Edit Renter</h2>
      <label htmlFor="name-input" className="form-element">
        Name:
        <input id="name-input" type="text" defaultValue={renterData.name} />
      </label>
      <label htmlFor="hourly-wages-input" className="form-element">
        Hourly Wages:
        <input id="hourly-wages-input" type="text" defaultValue={renterData.hourly_wages} />
      </label>
      <label htmlFor="hours-working-input" className="form-element">
        Hours Working:
        <input id="hours-working-input" type="text" defaultValue={renterData.hours_working} />
      </label>
      <label htmlFor="dog-count-input" className="form-element">
        # of Dogs:
        <input id="dog-count-input" type="text" defaultValue={renterData.dog_count} />
      </label>
      <label htmlFor="cat-count-input" className="form-element">
        # of Cats:
        <input id="cat-count-input" type="text" defaultValue={renterData.cat_count} />
      </label>
      <label htmlFor="share-input" className="form-element">
        Share:
        {activeUser.is_admin ? 
        <input id="share-input" type="text" defaultValue={renterData.share} /> :
        <input id="share-input" type="text" defaultValue={renterData.share} disabled />}
        
      </label>
      <button type="submit" onClick={submitHandler}>Submit</button>
    </form>
  );
};

EditRenterModal.propTypes = {
  changeRenter: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  renterData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hourly_wages: PropTypes.number.isRequired,
    hours_working: PropTypes.number.isRequired,
    dog_count: PropTypes.number.isRequired,
    cat_count: PropTypes.number.isRequired,
    share: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditRenterModal;
