import { TRY_AUTH, AUTH_SET_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyBPAe7fqer1dn68TGL5XXmI4OBjha2Agcg";
    let loginUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      apiKey;
    let signUpUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
      apiKey;
    if (authMode === "login") {
      dispatch(authCall(authData, loginUrl));
    } else {
      dispatch(authCall(authData, signUpUrl));
    }
  };
};

export const authCall = (authData, url) => {
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
          alert("auth error");
        } else {
          dispatch(authSetToken(parsed.idToken));
          startMainTabs();
        }

        console.log(parsed);
      })
      .catch(err => {
        alert("error");
        console.log(err);
        dispatch(uiStopLoading());
      });
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        reject();
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};
