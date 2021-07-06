import React from 'react';

const Renter = props => {
  return (
    <tr className="renter">
      <td>{props.renterData.name}</td>
      <td>{props.renterData.hourly_wages}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working)}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working*4.33333333333)}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working*4.33333333333*12)}</td>
      <td>{props.renterData.dog_count}</td>
      <td>{props.renterData.cat_count}</td>
      <td>{props.renterData.share}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working*4.33333333333*.3)}</td>
    </tr>
  );
};

export default Renter