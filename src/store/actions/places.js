import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, placeImage) => {
  return {
    type: ADD_PLACE,
    placeName: placeName,
    placeImage: placeImage
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
