import React from 'react';

const AddRenter = props => {

  const addRenter = () => {
    console.log('Adding renter');
  };

  return (
    <button onClick={addRenter}>AddRenter button</button>
  );
};

export default AddRenter;