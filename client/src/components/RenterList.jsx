import React, { useState, useEffect } from 'react';
import Renter from './Renter.jsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


const RenterList = props => {
  const dispatch = useDispatch();
  
  const maxRent = useSelector(state => state.maxRent);
  const renters = useSelector(state => state.renters);
  const [ totalDogs, setTotalDogs ] = useState(renters.map(renter => renter.dog_count).reduce((a, b) => a + b));
  const [ totalCats, setTotalCats ] = useState(renters.map(renter => renter.cat_count).reduce((a, b) => a + b));

  const deleteRenter = renterID => {
    axios.delete('/renters', { headers: {}, data: {id: Number(renterID) } })
      .then(results => {
        props.update();
      })
      .catch(err => {
        console.error(err);
      })
  };

  return (
    <div id="renters-tab">
      <table id="renter-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Hourly Gross</td>
            <td>Weekly Gross</td>
            <td>Monthly Gross</td>
            <td>Yearly Gross</td>
            <td>Dogs</td>
            <td>Cats</td>
            <td>Percentage Share</td>
            <td>Max Rent</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{totalDogs}</td>
            <td>{totalCats}</td>
            <td></td>
            <td>{maxRent}</td>
          </tr>
          {renters.map((renter, index) => <Renter
            update={props.update}
            setModalContent={content => { dispatch(actions.doChangeModalContent(content)); }}
            deleteRenter={deleteRenter}
            renterData={renter}
            key={index}
          />)}
        </tbody>
      </table>
    </div>
  );
};

export default RenterList;