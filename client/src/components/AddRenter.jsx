import React from 'react';
import AddRenterModal from './modals/AddRenterModal';

const AddRenter = props => {

  const addRenter = () => {
    props.setModalContent(<AddRenterModal closeModal={props.setModalContent.bind(null, null)}/>);
  };

  return (
    <button onClick={addRenter}>AddRenter button</button>
  );
};

export default AddRenter;