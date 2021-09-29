import * as React from 'react';
import AddRenterModal from './modals/AddRenterModal';
import axios from 'axios';
import { useAppDispatch } from './../hooks';
import actions from '../actions';


const AddRenter = props => {
  const dispatch = useAppDispatch();
  
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