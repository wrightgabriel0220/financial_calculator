import React from 'react';

const ReportIssueModal = props => {
  return (
    <form id="modal">
      <h2>Report an Issue</h2>
      <label>Username:
        <input type="text"></input>
      </label>
      <label>Issue:
        <input type="textarea"></input>
      </label>
    </form>
  )
};

export default ReportIssueModal;