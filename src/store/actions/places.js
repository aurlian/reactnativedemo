import { SET_PLACES, DELETE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

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
              .catch(err => {
                dispatch(uiStopLoading());
                alert("error occured");
                console.log(err);
              })
              .then(res => res.json())
              .then(parsed => {
                dispatch(uiStopLoading());
                console.log(parsed);
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
    const token = getState().auth.token;
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
        dispatch(deletePlaceFromLocalStore(key));
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
