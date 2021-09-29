import * as React from 'react';

const EditRenterModal = props => {
  const submitHandler = event => {
    event.preventDefault();

    let form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    if (form.checkValidity()) {
      props.changeRenter({
        name: getAndCastInputElementById('name-input').value,
        hourly: getAndCastInputElementById('hourly-wages-input').value,
        hours: getAndCastInputElementById('hours-working-input').value,
        dogs: getAndCastInputElementById('dog-count-input').value || 0,
        cats: getAndCastInputElementById('cat-count-input').value || 0,
        share: getAndCastInputElementById('share-input').value || 0,
      });
    } else {
      form.reportValidity();
    }

    props.closeModal();
  }

  return (
    <form id="modal">
      <h2>Edit Renter</h2>
      <label className="form-element"> Name:
        <input id="name-input" type="text" defaultValue={props.renterData.name}></input>
      </label>
      <label className="form-element"> Hourly Wages:
        <input id="hourly-wages-input" type="text" defaultValue={props.renterData.hourly_wages}></input>
      </label>
      <label className="form-element"> Hours Working:
        <input id="hours-working-input" type="text" defaultValue={props.renterData.hours_working}></input>
      </label>
      <label className="form-element"> # of Dogs:
        <input id="dog-count-input" type="text" defaultValue={props.renterData.dog_count}></input>
      </label>
      <label className="form-element"> # of Cats:
        <input id="cat-count-input" type="text" defaultValue={props.renterData.cat_count}></input>
      </label>
      <label className="form-element"> Share:
        <input id="share-input" type="text" defaultValue={props.renterData.share}></input>
      </label>
      <button onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default EditRenterModal;