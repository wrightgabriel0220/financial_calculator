import React from 'react';

const InfoTab = props => {
  return props.isHidden ? null : (
    <div id="info-tab">
      This is the info tab.
    </div>
  );
};

export default InfoTab;