import React from 'react';
import AddRenterModal from './modals/AddRenterModal';
import axios from 'axios';

const AddRenter = props => {
  const submitRenter = renter => {
    return axios.post('/renters', renter)
      .then(results => {
        return results;
      })
      .catch(err => {
        return err;
      });
  }

  const addRenter = () => {
    props.setModalContent(<AddRenterModal submitRenter={submitRenter} closeModal={props.setModalContent.bind(null, null)}/>);
  };

  return (
    <button onClick={addRenter}>AddRenter button</button>
  );
};

export default AddRenter;