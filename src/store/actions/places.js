import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, placeImage, location) => {
  return {
    type: ADD_PLACE,
    placeName: placeName,
    placeImage: placeImage,
    location: location
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
