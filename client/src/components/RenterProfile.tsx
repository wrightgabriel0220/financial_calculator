import * as React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import Expense from './Expense';

const RenterProfile = ({
  activeUser,
  moveInCost,
  renter,
  listing,
}) => {
  const [savings] = React.useState(0);
  const [expenseList, setExpenseList] = React.useState<any[]>([]);
  const [expenseTotal, setExpenseTotal] = React.useState(0);
  const [amountLeft, setAmountLeft] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`/expenses/${activeUser.id}`)
      .then(expenseData => {
        setExpenseList(expenseData.data);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
      });
  });

  React.useEffect(() => {
    setAmountLeft(moveInCost - savings);
  }, [savings]);

  React.useEffect(() => {
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

  return listing ? (
    <div id="renter-profile-tab">
      <div id="rp-stat-list">
        <div className="rp-stat">
          <span className="rp-stat-title">Move-out Timeline: </span>
          <span className="rp-stat-body">
            {Math.round(((amountLeft + expenseTotal) / (renter.hourly_wages * renter.hours_working)) * 100) / 100}
            weeks
          </span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat-title">Amount to Moving: </span>
          <span className="rp-stat-body">
            $
            {amountLeft}
          </span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat-title">Savings Amount: </span>
          <span className="rp-stat-body">
            $
            {savings}
          </span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat-title">Expenses: </span>
          <span className="rp-stat-body">
            $
            {expenseTotal}
          </span>
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
          <tr><td><button type="button" id="add-expense-button">Add Expense</button></td></tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div id="renter-profile-tab">
      Please select a listing to display renter data for.
    </div>
  );
};

RenterProfile.propTypes = {
  activeUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  moveInCost: PropTypes.number.isRequired,
  renter: PropTypes.shape({
    hourly_wages: PropTypes.number.isRequired,
    hours_working: PropTypes.number.isRequired,
  }).isRequired,
  listing: PropTypes.shape({
    address: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
};

export default RenterProfile;
