import * as React from 'react';

const Expense = props => {
  const handleToggle = event => {
    console.log(event.target.value);
  }

  return (
    <tr className="expense-row">
      <td className="expense-row-title">{props.expense.title}</td>
      <td className="expense-row-cost">{props.expense.cost}</td>
      <td><input className="toggle-expense" type="checkbox" onClick={handleToggle}></input></td>
    </tr>
  );
};

export default Expense;