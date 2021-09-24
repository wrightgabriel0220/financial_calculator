const initialState = {
  renters: [],
  listings: [],
  focusedListing: null,
  maxRentForAllRenters: 0,
  activeUser: null,
  activeRenter: null,
  infoTabHidden: true,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'renters': {
      return {
        ...state,
        renters: action.payload
      }
    }
    case 'listings': {
      return {
        ...state,
        listings: action.payload
      }
    }
    case 'focusedListing': {
      return {
        ...state,
        focusedListing: action.payload
      }
    }
    case 'modalContent': {
      return {
        ...state,
        modalContent: action.payload
      }
    }
    case 'infoTabHidden': {
      return {
        ...state,
        infoTabHidden: action.payload
      }
    }
    case 'maxRent': {
      return {
        ...state,
        maxRent: action.payload
      }
    }
    case 'activeUser': {
      return {
        ...state,
        activeUser: action.payload
      }
    }
    case 'activeRenter': {
      return {
        ...state,
        activeRenter: action.payload
      }
    }
    default: 
      return state;
  }
}