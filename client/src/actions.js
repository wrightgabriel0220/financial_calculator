const doChange = (type, payload) => ({ type, payload });

export default {
  doChangeRenterList: payload => doChange('renters', payload),
  doChangeListingList: payload => doChange('listings', payload),
  doChangeFocusedListing: payload => doChange('focusedListing', payload),
  doChangeMaxRent: payload => doChange('maxRent', payload),
  doChangeActiveUser: payload => doChange('activeUser', payload),
  doChangeActiveRenter: payload => doChange('activeRenter', payload),
  doChangeModalContent: payload => doChange('modalContent', payload),
  doToggleInfoTabHidden: payload => doChange('infoTabHidden', payload),
};
