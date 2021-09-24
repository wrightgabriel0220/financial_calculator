import React from 'react';
import AddRenterModal from './modals/AddRenterModal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import actions from './../actions';


const AddRenter = props => {
  const dispatch = useDispatch();
  
  const submitRenter = renter => {
    return axios.post('/renters', renter)
      .then(results => {
        props.update();
        return results;
      })
      .catch(err => {
        return err;
      });
  }

  const addRenter = () => {
    dispatch(actions.doChangeModalContent(<AddRenterModal submitRenter={submitRenter} closeModal={dispatch.bind(null, actions.doChangeModalContent(null))} />));
  };

  return (
    <button onClick={addRenter}>Add Renter</button>
  );
};

export default AddRenter;