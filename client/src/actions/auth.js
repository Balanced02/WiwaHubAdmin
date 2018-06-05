import { history } from '../App'
import { callApi } from '../utils'
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
  return {
    type: LOGOUT
  };
};

export const startRegister = formData => {
  return dispatch => {
    dispatch(startLoading());
    callApi("/auth/register", formData, "POST")
      .then(data => {
        dispatch(stopLoading());
        dispatch(showInfo("Registration Successful! Please go to Login"));
        console.log(data);
        history.push("/login");
      })
      .catch(err => {
        dispatch(stopLoading());
        dispatch(showError(err));
        console.log(err);
      });
  };
};

export const startLogin = formData => {
  return dispatch => {
    dispatch(startLoading());
    callApi("/auth/login", formData, "POST")
      .then(data => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("eduTorchUser", JSON.stringify(data.user._doc));
        dispatch(stopLoading());
        dispatch(login(data.user));
        history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(showError("Invalid Username or Password"));
        console.log(err);
      });
  };
};