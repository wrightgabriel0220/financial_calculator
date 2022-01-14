import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import Renter from './Renter';
import { useAppSelector, useAppDispatch } from '../hooks';
import actions from '../actions';

const RenterList = ({ update }) => {
  const dispatch = useAppDispatch();
  
  const maxRent = useAppSelector(state => state.maxRent);
  const renters = useAppSelector(state => state.renters);
  const [totalDogs] = React.useState(renters.map(renter => renter.dog_count).reduce((a, b) => a + b));
  const [totalCats] = React.useState(renters.map(renter => renter.cat_count).reduce((a, b) => a + b));

  const deleteRenter = renterID => {
    axios.delete('/renters', { headers: {}, data: { id: Number(renterID) } })
      .then(() => {
        update();
      })
      .catch(err => {
        console.error(err);
      });
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
            <td />
            <td />
            <td />
            <td />
            <td>{totalDogs}</td>
            <td>{totalCats}</td>
            <td />
            <td>{maxRent}</td>
          </tr>
          {renters.map((renter, index) => (
            <Renter
              update={update}
              setModalContent={content => { dispatch(actions.doChangeModalContent(content)); }}
              deleteRenter={deleteRenter}
              renterData={renter}
              key={`${renter.name + index}`}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

RenterList.propTypes = {
  update: PropTypes.func.isRequired,
};

export default RenterList;
