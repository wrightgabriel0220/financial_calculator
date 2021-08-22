import React, { useState, useEffect } from 'react';
import Expense from './Expense';
import axios from 'axios';

const RenterProfile = props => {
  const [ savings, setSavings ] = useState(0);
  const [ expenseList, setExpenseList ] = useState([]);
  const [ expenseTotal, setExpenseTotal ] = useState(0)
  const [ amountLeft, setAmountLeft ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    axios.get('/expenses')
      .then(expenseData => {
        setExpenseList(expenseData.data);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
      })
  }, []);

  useEffect(() => {
    setAmountLeft(props.moveInCost - savings);
  }, [savings]);

  useEffect(() => {
    if (expenseList.length > 0) {
      setExpenseTotal(expenseList.map(expense => expense.cost).reduce((costA, costB) => costA + costB));
    } else {
      setExpenseTotal(0);
    }
  }, [expenseList]);

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

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
          <span className="rp-stat-body">${expenseTotal}</span>
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
          {expenseList.map((expense, index) => <Expense key={expense.title + index} expense={expense} />)}
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