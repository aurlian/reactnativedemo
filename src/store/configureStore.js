import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import placesReducer from "./reducers/places";
import uiReducer from "./reducers/ui";
import tokenReducer from "./reducers/auth";

const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: tokenReducer
});

const configureStore = () => {
  return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default configureStore;
