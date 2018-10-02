import { SET_PLACES, DELETE_PLACE } from "../actions/actionTypes";

const initialState = {
  places: []
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
      break;
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
      break;
    // case ADD_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.concat({
    //       key: Math.random().toString(),
    //       name: action.placeName,
    //       image: action.placeImage,
    //       location: action.location
    //     })
    //   };
    // case DELETE_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.filter(place => {
    //       return place.key !== action.placeKey;
    //     })
    //   };
    default:
      return state;
  }
};

export default placeReducer;
