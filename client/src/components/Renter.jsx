import React from 'react';

const Renter = props => {
  return (
    <tr className="renter">
      <td>{props.renterData.name}</td>
      <td>{props.renterData.hourly_wages}</td>
      <td>{props.renterData.hours_working}</td>
      <td>{props.renterData.dog_count}</td>
      <td>{props.renterData.cat_count}</td>
      <td>{props.renterData.share}</td>
    </tr>
  );
};

export default Renter