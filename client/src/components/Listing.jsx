import React from 'react';

const Listing = props => {
  const getRenterShare = (rent, renter) => {
    let renterMax = renter.hourly_wages * renter.hours_working * 4.33333333 * .3 - 100;
    if (rent * (renter.share * .01) > renterMax) {
      return Math.round(renterMax); 
    } else {
      return Math.round(rent * (renter.share * .01));
    }
  };


  return (
    <li className="listing">
      <div className="listing-card">
        <div>Address: {props.listingData.address}</div>
        <div>Summary: {props.listingData.summary}</div>
        <div>{props.listingData.bedrooms}bd/{props.listingData.bathrooms}br</div>
        <div>{props.listingData.size}sqft.</div>
      </div>
      <table className="listing-rent-info">
        <thead>
          <tr>
            <td>Rent for this listing</td>
            {props.renters.map(renter => <td>{renter.name}</td>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.listingData.rent}</td>
            {props.renters.map(renter => <td>{getRenterShare(props.listingData.rent, renter)}</td>)}
          </tr>
        </tbody>
      </table>
    </li>
  );
};

export default Listing;