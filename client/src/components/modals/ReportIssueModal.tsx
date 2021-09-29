import axios from 'axios';
import * as React from 'react';

const ReportIssueModal = props => {
  const submitHandler = event => {
    event.preventDefault();

    let form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    if (form.checkValidity()) {
      axios.post('/issues', {
        description: getAndCastInputElementById('report-issue').value,
        renterName: getAndCastInputElementById('report-username').value
      })
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="modal">
      <h2>Report an Issue</h2>
      <label>Username:
        <input required className="form-element" type="text" id="report-username"></input>
      </label>
      <label>Issue:
        <input required className="form-element" type="textarea" id="report-issue"></input>
      </label>
      <button id="submit-report" onClick={submitHandler}>Submit</button>
    </form>
  )
};

export default ReportIssueModal;