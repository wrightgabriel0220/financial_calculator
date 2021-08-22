import React from 'react';

const Expense = props => {
  return (
    <tr className="expense-row">
      <td className="expense-row-title">{props.expense.title}</td>
      <td className="expense-row-cost">{props.expense.cost}</td>
    </tr>
  );
};

export default Expense;