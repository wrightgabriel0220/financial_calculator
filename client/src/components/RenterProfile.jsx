import React, { useState, useEffect } from 'react';

const RenterProfile = props => {
  const [ savings, setSavings ] = useState(0);
  const [ amountLeft, setAmountLeft ] = useState(0);

  useEffect(() => {
    setAmountLeft(props.moveInCost - savings);
  }, [savings]);

  return props.listing ? (
    <div id="renter-profile-tab">
      <div id="rp-stat-list">
        <div className="rp-stat">
          <span className="rp-stat-title">Move-out Timeline: </span>
          <span className="rp-stat-body">{Math.round((amountLeft / (props.renter.hourly_wages * props.renter.hours_working)) * 100) / 100} weeks</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat-title">Amount to Moving: </span>
          <span className="rp-stat-body">${amountLeft}</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat-title">Savings Amount: </span>
          <span className="rp-stat-body">${savings}</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat-title">Expenses: </span>
          <span className="rp-stat-body">$0</span>
        </div>
      </div>
      <table id="expenses-table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {/*map through a list of expenses here*/}
        </tbody>
      </table>
    </div>
  ) : (
    <div id="renter-profile-tab">
      Please select a listing to display renter data for.
    </div>
  );
};

export default RenterProfile;