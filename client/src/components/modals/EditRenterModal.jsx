import React from 'react';

const EditRenterModal = props => {
  const submitHandler = event => {
    event.preventDefault();

    let form = document.getElementById('modal');
    if (form.checkValidity()) {
      props.changeRenter({
        name: document.getElementById('name-input').value,
        hourly: document.getElementById('hourly-wages-input').value,
        hours: document.getElementById('hours-working-input').value,
        dogs: document.getElementById('dog-count-input').value || 0,
        cats: document.getElementById('cat-count-input').value || 0,
        share: document.getElementById('share-input').value || 0,
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