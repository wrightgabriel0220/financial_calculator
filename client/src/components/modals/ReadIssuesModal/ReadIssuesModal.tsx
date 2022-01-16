import * as React from 'react';
import * as PropTypes from 'prop-types';
import Issue from './Issue';

const ReadIssuesModal = ({ issues }) => {
  return (
    <div id="modal" className="issues-modal">
      <table id="issues-table">
        <thead>
          <tr>
            <td>Reporter</td>
            <td>Issue Desc.</td>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => <Issue issue={issue}/>)}
        </tbody>
      </table>
    </div>
  );
};

ReadIssuesModal.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default ReadIssuesModal;