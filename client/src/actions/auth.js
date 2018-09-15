import { history } from "../App";
import { callApi } from "../utils";
import { startLoading, stopLoading, showError, showInfo } from "./feedback";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = user => {
  return {
    type: LOGIN,
    user
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    history.push("/login");
    callApi("/auth/logout")
      .then(data => {
        window.location.reload()
        type: LOGOUT;
      })
      .catch(err => {
        type: LOGOUT;
      });
  };
};

export const startRegister = formData => {
  return dispatch => {
    console.log("Starting register");
    dispatch(startLoading());
    callApi("/auth/register", formData, "POST")
      .then(data => {
        dispatch(stopLoading());
        dispatch(showInfo("Registration Successful! Please go to Login"));
        console.log(data);
        history.push("/login");
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(showError("Username or email already is use"));
      });
  };
};

export const startLogin = formData => {
  return dispatch => {
    dispatch(startLoading());
    callApi("/auth/login", formData, "POST")
      .then(data => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("wiwaHub", JSON.stringify(data.user._doc));
        dispatch(stopLoading());
        dispatch(login(data.user));
        history.push("/dashboard");
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(showError("Invalid Username or Password"));
        console.log(err);
      });
  };
};
