import * as React from 'react';
import * as PropTypes from 'prop-types';

const Issue = ({ issue }) => {
  return (
    <tr>
      <td>{issue.reporter_name}</td>
      <td>{issue.description}</td>
    </tr>
  )
};

Issue.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    report_name: PropTypes.string,
  }).isRequired,
};

export default Issue;