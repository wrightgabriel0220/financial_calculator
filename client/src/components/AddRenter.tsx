import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import AddRenterModal from './modals/AddRenterModal';
import { useAppDispatch } from '../hooks';
import actions from '../actions';

const AddRenter = ({ update }) => {
  const dispatch = useAppDispatch();
  
  const submitRenter = renter => (
    axios.post('/renters', renter)
      .then(results => {
        update();
        return results;
      })
      .catch(err => err)
  );

  const addRenter = () => {
    dispatch(actions.doChangeModalContent(
      <AddRenterModal
        submitRenter={submitRenter}
        closeModal={() => { dispatch(actions.doChangeModalContent(null)); }}
        // TODO: Figure out why eslint wants a comma-dangle here
      // eslint-disable-next-line comma-dangle
      />
    ));
  };

  return (
    <button type="submit" onClick={addRenter}>Add Renter</button>
  );
};

AddRenter.propTypes = {
  update: PropTypes.func.isRequired,
};

export default AddRenter;
