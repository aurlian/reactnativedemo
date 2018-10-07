import {
  SET_PLACES,
  DELETE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from "../actions/actionTypes";

const initialState = {
  places: [],
  placeAdded: false
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      };
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      };

    default:
      return state;
  }
};

export default placeReducer;
