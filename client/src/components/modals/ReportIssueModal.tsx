import axios from 'axios';
import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import actions from '../../actions';

const ReportIssueModal = () => {
  const dispatch = useAppDispatch();

  const activeUser = useAppSelector(state => state.activeUser);

  const submitHandler = event => {
    event.preventDefault();

    const form: HTMLFormElement = document.getElementById('modal') as HTMLFormElement;

    const getAndCastInputElementById = (id: string) => document.getElementById(id) as HTMLInputElement;

    if (form.checkValidity()) {
      axios.post('/issues', {
        description: getAndCastInputElementById('report-issue').value,
        renterName: activeUser.username,
      })
        .then(results => {
          // TODO: Close the modal
          dispatch(actions.doChangeModalContent(null));
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      form.reportValidity();
    }
  };

  return (
    <form id="modal">
      <h2>Report an Issue</h2>
      <label htmlFor="report-issue">
        Issue:
        <input required className="form-element" type="textarea" id="report-issue" />
      </label>
      <button type="submit" id="submit-report" onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default ReportIssueModal;
