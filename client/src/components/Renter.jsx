import React from 'react';
import EditRenterModal from './modals/EditRenterModal';
import axios from 'axios';
import RenterList from './RenterList';

const Renter = props => {
  const changeRenter = renter => {
    axios.put('/renters', {
      id: props.renterData.id,
      updates: {
        name: renter.name,
        hourly_wages: renter.hourly,
        hours_working: renter.hours,
        dog_count: renter.dogs,
        cat_count: renter.cats,
        share: renter.share
      }
    }).then(results => {
      // update RenterList
    }).catch(err => {
      console.error(err);
    })
  };

  const editHandler = () => {
    props.setModalContent(<EditRenterModal renterData={props.renterData} changeRenter={changeRenter} closeModal={props.setModalContent.bind(null, null)}/>);
  };

  return (
    <tr className="renter" onClick={editHandler}>
      <td>{props.renterData.name}</td>
      <td>{props.renterData.hourly_wages}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working)}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working*4.33333333333)}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working*4.33333333333*12)}</td>
      <td>{props.renterData.dog_count}</td>
      <td>{props.renterData.cat_count}</td>
      <td>{props.renterData.share}</td>
      <td>{Math.round(props.renterData.hourly_wages*props.renterData.hours_working*4.33333333333*.3)}</td>
      <td><button onClick={props.deleteRenter.bind(null, props.renterData.id)}>X</button></td>
    </tr>
  );
};

export default Renter