/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import Navbar from '../Navbar';
import HostRegPage from '../pages/HostRegPage';
import MemberRegPage from '../pages/MemberRegPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import RenterProfileSetupPage from '../pages/RenterProfileSetupPage';
import { useAppSelector, useAppDispatch } from '../../hooks';
import actions from '../../actions.js';

const axios = require('axios');

const {
  doToggleInfoTabHidden,
  doChangeRenterList,
  doChangeListingList,
  doChangeFocusedListingId,
  doChangeMaxRent,
  doChangeActiveUser,
  doChangeActiveRenter,
} = actions;

const App = () => {
  const renters = useAppSelector(state => state.renters);
  const listings = useAppSelector(state => state.listings);
  const focusedListingId = useAppSelector(state => state.focusedListingId);
  const activeUser = useAppSelector(state => state.activeUser);
  const [basePage, setBasePage] = React.useState(<div />);
  const [isLoading, setIsLoading] = React.useState(Boolean(activeUser));

  const dispatch = useAppDispatch();

  React.useEffect(() => {

    if (isLoading) {
      updateRenterList().then(updateListingList()).then(() => { setIsLoading(false); }).catch(err => {
        
        console.error(err);
      });
    }
  }, []);

  React.useEffect(() => {
    if (focusedListingId) {
      if (listings.filter(listing => listing.id === focusedListingId).length === 0) {
        dispatch(doChangeFocusedListingId(null));
      }
    }
  }, [listings]);

  React.useEffect(() => {
    if (activeUser === null) {
      dispatch(doChangeActiveRenter(null));
      setBasePage(getBasePage());
    } else {
      updateRenterList().then(updateListingList()).then(() => {
        
        setIsLoading(false);
        setBasePage(getBasePage());
      }).catch(err => {
        console.error(err);
      });
    }
  }, [activeUser]);

  React.useEffect(() => {
    dispatch(doChangeActiveRenter(renters.find(renter => renter.name === activeUser.first_name)));
  }, [renters]);

  React.useEffect(() => {
    console.log('new focused listing id: ', focusedListingId);
  }, [focusedListingId])

  const logout = () => {
    // Unsubscribe from asynchronously retrieved datasets and disable user-dependent UI features

    dispatch(doChangeActiveUser(null));
    dispatch(doChangeListingList([]));
    dispatch(doToggleInfoTabHidden(true));
  };

  const updateRenterList = () => (
    
    axios.post('/renters/get', { groupCode: activeUser.group_code })
      .then(rentersInDB => {
        dispatch(doChangeRenterList(rentersInDB.data));
        return rentersInDB;
      })
      .then(rentersInDB => {
        if (rentersInDB.data.length !== 0) {
          dispatch(
            doChangeMaxRent(
              rentersInDB.data.map(
                renter => Math.round(renter.hourly_wages * renter.hours_working * 4.33333333333 * 0.3 - 100),
              ).reduce((a, b) => a + b),
            ),
          );
        } else {
          dispatch(
            doChangeRenterList(
              [{
                name: 'N/A', hourly_wages: 0, hours_working: 0, dog_count: 0, cat_count: 0, share: 0,
              }],
            ),
          );
        }
      })
  );

  const updateListingList = () => (
    axios.get('/listings')
      .then(listingsInDB => {
        dispatch(doChangeListingList(listingsInDB.data));
      })
      .catch(err => {
        console.error(err);
      })
  );

  const focusListingById = id => {
    console.log('Changing focused listing id to ', id);
    dispatch(doChangeFocusedListingId(id));

    // console.log('target listing id: ', id);
    // console.log('listing list: ', listings);
    // dispatch(doChangeFocusedListing(listings.find(listing => {return listing.id === id})));
  };

  const getBasePage = () => {
    if (activeUser !== null) {
      if (activeUser.has_logged_once) {
        return (
          <DashboardPage
            updateRenterList={updateRenterList}
            updateListingList={updateListingList}
            focusListingById={focusListingById}
          />
        );
      }

      return <RenterProfileSetupPage returnToDash={() => {
        const firstLoggedUser = JSON.parse(JSON.stringify(activeUser));
        firstLoggedUser.has_logged_once = true;
        dispatch(doChangeActiveUser(firstLoggedUser));
      }}/>;
    }

    return <HomePage />;
  };

  if (isLoading) {
    return (
      <div id="app-body">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div id="app-body">
        <Navbar logout={logout} />
        <Switch>
          <Route exact path="/">
            {basePage}
          </Route>
          <Route exact path="/register">
            <h2 id="group-code-question">
              Are you registering as a <Link to="/register/host">group host</Link> or <Link to="/register/member">group
                member</Link>?
            </h2>
          </Route>
          <Route exact path="/register/host">
            <HostRegPage />
          </Route>
          <Route exact path="/register/member">
            <MemberRegPage />
          </Route>
          <Route path="/login">
            <LoginPage login={payload => { dispatch(doChangeActiveUser(payload)); }} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
