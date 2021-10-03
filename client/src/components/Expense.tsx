import * as React from 'react';
import * as PropTypes from 'prop-types';

const Expense = ({ expense }) => {
  const handleToggle = event => {
    console.log(event.target.value);
    console.log(expense);
  };

  return (
    <tr className="expense-row">
      <td className="expense-row-title">{expense.title}</td>
      <td className="expense-row-cost">{expense.cost}</td>
      <td><input className="toggle-expense" type="checkbox" onClick={handleToggle} /></td>
    </tr>
  );
};

Expense.propTypes = {
  expense: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
  }).isRequired,
};

export default Expense;
