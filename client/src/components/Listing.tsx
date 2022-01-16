import axios from 'axios';
import * as React from 'react';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line object-curly-newline
const Listing = ({ renters, listingData, focusListing, update }) => {
  const [renterShares, setRenterShares] = React.useState({});

  React.useEffect(() => {
    const renterShareTracker = {};
    for (const renter of renters) {
      renterShareTracker[renter.name] = getRenterShare(renter);
    }
    
    setRenterShares(renterShareTracker);
  }, []);

  const getRenterShare = renter => listingData.rent * (renter.share * 0.01);

  const getStartupCost = rentShare => Math.round(rentShare * 3);

  const deleteHandler = () => {
    axios.delete('/listings', {
      headers: {},
      data: {
        id: listingData.id,
      },
    })
      .then(() => {
        update();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    // TODO: Fix this li for accessbility
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <li className="listing" onClick={focusListing.bind(null, listingData.id)}>
      <div className="listing-card">
        <div>
          Address:
          {listingData.address}
        </div>
        <div>
          Summary:
          {listingData.summary}
        </div>
        <div>
          {listingData.bedrooms}
          bd/
          {listingData.bathrooms}
          br
        </div>
        <div>
          {listingData.size}
          sqft.
        </div>
      </div>
      <table className="listing-rent-info">
        <thead>
          <tr>
            <td>Rent for this listing</td>
            {renters.map(renter => <td key={renter.name}>{renter.name}</td>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              $
              {listingData.rent}
            </td>
            {renters.map(renter => (
              <td key={`share${renter.name}`}>
                $
                {String(renterShares[renter.name])}
              </td>
            ))}
          </tr>
          <tr>
            <td>Move-in Cost</td>
            {renters.map(renter => <td key={`blank${renter.name}`} />)}
          </tr>
          <tr>
            <td>
              $
              {String(renters.map(renter => getStartupCost(renterShares[renter.name])).reduce((a, b) => a + b))}
            </td>
            {renters.map(renter => (
              <td className={`moveInCost${renter.name}`} key={`moveincost${renter.name}`}>
                $
                {String(getStartupCost(renterShares[renter.name]))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={deleteHandler}>X</button>
    </li>
  );
};

Listing.propTypes = {
  renters: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  listingData: PropTypes.shape({
    rent: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    bathrooms: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
  focusListing: PropTypes.func.isRequired,
};

export default Listing;
