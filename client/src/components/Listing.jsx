import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Listing = props => {
  const [ renterShares, setRenterShares ] = useState({});

  useEffect(() => {
    let renterShareTracker = {};
    for (let renter of props.renters) {
      console.log(renter);
      renterShareTracker[renter.name] = getRenterShare(renter);
    }
    
    setRenterShares(renterShareTracker);
  }, [])

  const getRenterShare = renter => props.listingData.rent * (renter.share * .01);

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
    <li className="listing" onClick={props.focusListing ? props.focusListing.bind(null, props.listingData.id) : null}>
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
            <td>${String(props.renters.map(renter => getStartupCost(renterShares[renter.name])).reduce((a, b) => a + b))}</td>
            {props.renters.map(renter => <td className={`moveInCost${renter.name}`} key={`moveincost${renter.name}`}>${String(getStartupCost(renterShares[renter.name]))}</td>)}
          </tr>
        </tbody>
      </table>
      <button onClick={deleteHandler}>X</button>
    </li>
  );
};

export default Listing;