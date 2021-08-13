import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Listing = props => {
  const [ renterShares, setRenterShares ] = useState({});

  useEffect(() => {
    let totalListingPrice = props.listingData.rent;
    let renterShareTracker = {};
    while (totalListingPrice > 0) {  
      for (let renter of props.renters) {
        renterShareTracker[renter.name] = renterShareTracker[renter.name] || 0;
        let renterMax = Number(renter.hourly_wages) * renter.hours_working * 4.3333333 * .3 - 100;
        if (renterShareTracker[renter.name] > 0 && renterShareTracker[renter.name] < renterMax) {
          let overflowToRenter = (renterMax - renterShareTracker[renter.name] - totalListingPrice) > 0 ?
            renterMax - renterShareTracker[renter.name] - totalListingPrice : 
            renterMax - renterShareTracker[renter.name];
          renterShareTracker[renter.name] += Math.round(overflowToRenter);
          totalListingPrice -= overflowToRenter;
        } else {
          renterShareTracker[renter.name] += Math.round(getRenterShare(totalListingPrice, renter));
          totalListingPrice -= Math.round(renterShareTracker[renter.name]);
        }
        if (totalListingPrice <= 0) {
          break;
        }
      }
    }
    setRenterShares(renterShareTracker);
  }, [])

  const getRenterShare = (rent, renter) => {
    let renterMax = renter.hourly_wages * renter.hours_working * 4.33333333 * .3 - 100;
    if (rent * (renter.share * .01) > renterMax) {
      return Math.round(renterMax); 
    } else {
      return Math.round(rent * (renter.share * .01));
    }
  };

  const getStartupCost = rentShare => {
    return Math.round(rentShare * 3 );
  };

  const deleteHandler = () => {
    axios.delete('/listings', {
      headers: {},
      data: {
        id: props.listingData.id 
      }
    })
      .then(() => {
        props.update();
      })
      .catch(err => {
        console.error(err);
      })
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
            {props.renters.map(renter => <td key={renter.name}>{renter.name}</td>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${props.listingData.rent}</td>
            {props.renters.map(renter => <td key={`share${renter.name}`}>${String(renterShares[renter.name])}</td>)}
          </tr>
          <tr>
            <td>Move-in Cost</td>
            {props.renters.map(renter => <td key={`blank${renter.name}`}></td>)}
          </tr>
          <tr>
            <td>{String(props.renters.map(renter => getStartupCost(renterShares[renter.name])).reduce((a, b) => a + b))}</td>
            {props.renters.map(renter => <td key={`moveincost${renter.name}`}>${String(getStartupCost(renterShares[renter.name]))}</td>)}
          </tr>
        </tbody>
      </table>
      <button onClick={deleteHandler}>X</button>
    </li>
  );
};

export default Listing;