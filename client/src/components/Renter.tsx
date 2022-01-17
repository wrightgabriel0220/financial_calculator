import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import EditRenterModal from './modals/EditRenterModal';
import { useAppSelector } from '../hooks';

const Renter = ({
  renterData,
  update,
  setModalContent,
}) => {
  const activeUser = useAppSelector(state => state.activeUser);

  const changeRenter = renter => {
    axios.put('/renters', {
      id: renterData.id,
      updates: {
        name: renter.name,
        hourly_wages: renter.hourly,
        hours_working: renter.hours,
        dog_count: renter.dogs,
        cat_count: renter.cats,
        share: renter.share,
      },
    }).then(() => {
      update();
    }).catch(err => {
      console.error(err);
    });
  };

  const closeModal = () => { setModalContent(null); };

  const editHandler = event => {
    if (activeUser.is_admin) {
      if (Array.from(event.target.classList).includes('delete-button')) { return; }
      setModalContent(
        <EditRenterModal renterData={renterData} changeRenter={changeRenter} closeModal={closeModal} />,
      );
    }
  };

  return (
    <tr className="renter" onClick={editHandler}>
      <td>{renterData.name}</td>
      <td>{renterData.hourly_wages}</td>
      <td>{Math.round(renterData.hourly_wages * renterData.hours_working)}</td>
      <td>{Math.round(renterData.hourly_wages * renterData.hours_working * 4.33333333333)}</td>
      <td>{Math.round(renterData.hourly_wages * renterData.hours_working * 4.33333333333 * 12)}</td>
      <td>{renterData.dog_count}</td>
      <td>{renterData.cat_count}</td>
      <td>{renterData.share}</td>
      <td>{Math.round(renterData.hourly_wages * renterData.hours_working * 4.33333333333 * 0.3)}</td>
    </tr>
  );
};

Renter.propTypes = {
  renterData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hourly_wages: PropTypes.number.isRequired,
    hours_working: PropTypes.number.isRequired,
    dog_count: PropTypes.number.isRequired,
    cat_count: PropTypes.number.isRequired,
    share: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default Renter;
