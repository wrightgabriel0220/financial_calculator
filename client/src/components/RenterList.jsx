import React from 'react';
import Renter from './Renter.jsx';

const RenterList = props => {
  return (
    <div id="renters-tab">
      <table id="renter-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Hourly Wage</td>
            <td>Hours Working</td>
            <td>Dogs</td>
            <td>Cats</td>
            <td>Percentage Share</td>
          </tr>
        </thead>
        <tbody>
          {props.renters.map((renter, index) => <Renter renterData={renter} key={index}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default RenterList;