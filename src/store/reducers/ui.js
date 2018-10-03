import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/actionTypes";

const initialState = {
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      console.log("isloading true");
      return {
        isLoading: true
      };
    case UI_STOP_LOADING:
      console.log("isloading false");
      return {
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
