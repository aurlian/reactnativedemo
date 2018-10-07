import {
  SET_PLACES,
  DELETE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import { logInfo, logObject } from "../../logger/logger";

export const addPlace = (placeName, placeImage, location) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .then(token => {
        fetch(
          "https://us-central1-serdig-1538262587074.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: placeImage.base64
            }),
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
          .then(res => {
            if (res.status === 401) {
              console.log("failed to upload image");
            }
            return res.json();
          })
          .then(parsed => {
            if (!parsed.imageUrl) {
              dispatch(uiStopLoading());
              alert("failed");
              return;
            }
            const placeData = {
              name: placeName,
              location: location,
              image: parsed.imageUrl
            };
            fetch(
              "https://serdig-1538262587074.firebaseio.com/places.json?auth=" +
                token,
              {
                method: "POST",
                body: JSON.stringify(placeData)
              }
            )
              .then(res => {
                if (res.ok) {
                  res.json();
                } else {
                  throw new Error("http error");
                }
              })
              .then(parsed => {
                dispatch(uiStopLoading());
                dispatch(placeAdded());
              })
              .catch(err => {
                dispatch(uiStopLoading());
                alert("error occured");
                console.log(err);
              });
          })
          .catch(err => {
            dispatch(uiStopLoading());
            alert("error occured");
            console.log(err);
          });
      })
      .catch(() => {
        alert("no token");
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        fetch(
          "https://serdig-1538262587074.firebaseio.com/places.json?auth=" +
            token
        )
          .then(res => res.json())
          .then(parsed => {
            const places = [];
            for (let key in parsed) {
              places.push({
                ...parsed[key],
                key: key,
                image: {
                  uri: parsed[key].image
                }
              });
            }
            dispatch(setPlaces(places));
          })
          .catch(err => {
            alert("error");
            console.log(err);
          });
      })
      .catch(() => {
        alert("no token");
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return (dispatch, getState) => {
    dispatch(authGetToken())
      .then(token => {
        fetch(
          "https://serdig-1538262587074.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        )
          .then(res => res.json())
          .then(parsed => {
            logObject(parsed);
            dispatch(deletePlaceFromLocalStore(key));
          })
          .catch(err => {
            alert("error");
            console.log(err);
          });
      })
      .catch(err => {
        alert("error");
        console.log(err);
      });
  };
};

export const deletePlaceFromLocalStore = key => {
  return {
    type: DELETE_PLACE,
    key: key
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};
