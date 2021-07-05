import React from 'react';
import RenterList from './RenterList';
import ListingList from './ListingList';

const App = props => {
  return (
    <div id="app-body">
      <RenterList /> 
      <ListingList />
    </div>
  );
};

export default App;