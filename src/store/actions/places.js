import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, placeImage, location) => {
  return dispatch => {
    fetch(
      "https://us-central1-serdig-1538262587074.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: placeImage.base64
        })
      }
    )
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsed => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsed.imageUrl
        };
        fetch("https://serdig-1538262587074.firebaseio.com/places.json", {
          method: "POST",
          body: JSON.stringify(placeData)
        })
          .catch(err => console.log(err))
          .then(res => res.json())
          .then(parsed => {
            console.log(parsed);
          });
      });
  };

  // return {
  //   type: ADD_PLACE,
  //   placeName: placeName,
  //   placeImage: placeImage,
  //   location: location
  // };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
