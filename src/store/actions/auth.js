import { AsyncStorage } from "react-native";

import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import { logInfo, logError, logObject } from "../../logger/logger";

const FIREBASE_APIKEY = "AIzaSyBPAe7fqer1dn68TGL5XXmI4OBjha2Agcg";

const LOGIN_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
  FIREBASE_APIKEY;

const REGISTER_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
  FIREBASE_APIKEY;

const REFRESH_TOKEN_URL =
  "https://securetoken.googleapis.com/v1/token?key=" + FIREBASE_APIKEY;

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    if (authMode === "login") {
      dispatch(authCall(authData, LOGIN_URL));
    } else {
      dispatch(authCall(authData, REGISTER_URL));
    }
  };
};

const authCall = (authData, url) => {
  return dispatch => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(parsed => {
        dispatch(uiStopLoading());
        if (!parsed.idToken) {
          //todo
          logError("auth error");
          alert("login failed. show to ui");
        } else {
          dispatch(
            authStoreToken(
              parsed.idToken,
              parsed.expiresIn,
              parsed.refreshToken
            )
          );
          startMainTabs();
        }
      })
      .catch(err => {
        let errorMessage = "Error while calling auth api. " + err;
        logError(errorMessage);
        dispatch(uiStopLoading());
      });
  };
};

export const authRefresh = refreshToken => {
  logInfo("refreshing token");
  return dispatch => {
    return new Promise((resolve, reject) => {
      fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=refresh_token&refresh_token=" + refreshToken
      })
        .then(res => res.json())
        .then(parsed => {
          if (!parsed.id_token) {
            reject("failed to refresh token");
          } else {
            dispatch(
              authStoreToken(
                parsed.id_token,
                parsed.expires_in,
                parsed.refresh_token
              )
            );
            resolve(parsed.id_token);
          }
        })
        .catch(err => {
          const errorMsg = "error while refreshing token: " + err;
          logError(errorMsg);
          return reject(errorMsg);
        });
    });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  logInfo("Storing auth info in asyncStorage");
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem("serdig:auth:token", token);
    AsyncStorage.setItem("serdig:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("serdig:auth:refreshToken", refreshToken);
  };
};

export const authGetToken = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Promise.all([
        AsyncStorage.getItem("serdig:auth:token"),
        AsyncStorage.getItem("serdig:auth:expiryDate"),
        AsyncStorage.getItem("serdig:auth:refreshToken")
      ])
        .then(values => {
          logInfo("Async Storage contents:");
          if (values.length === 3) {
            let authToken = values[0];
            let authTokenExpiryDate = values[1];
            let authRefreshToken = values[2];

            const parsedExpiryDate = new Date(parseInt(authTokenExpiryDate));
            const now = new Date();
            if (parsedExpiryDate <= now) {
              logInfo("token is expired");
              dispatch(authRefresh(authRefreshToken))
                .then(token => {
                  resolve(token);
                })
                .catch(err => {
                  reject(err);
                });
            } else {
              return resolve(authToken);
            }
          } else {
            return reject("info: no tokens found in AsyncStorage");
          }
        })
        .catch(err => {
          const errorMsg =
            "error occured while getting token from async storage: " + err;
          logError(errorMsg);
          return reject(errorMsg);
        });
    });
  };
};

export const authAutoSignIn = () => {
  logInfo("Auto sign in");
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        if (token) {
          logInfo("user is logged in");
          startMainTabs();
        }
      })
      .catch(err => {
        logError("user not authenticated: " + err);
      });
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("serdig:auth:token");
    AsyncStorage.removeItem("serdig:auth:expiryDate");
    AsyncStorage.removeItem("serdig:auth:refreshToken");
  };
};
