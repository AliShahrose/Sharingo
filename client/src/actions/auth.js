import axios from "axios";
import alertify from "alertifyjs";
import setHeaderToken from "../utilities/token";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SIGNOUT,
  CLEAR_PROFILE,
  CHANGE_PASSWORD,
  CLEAR_PROFILES,
} from "./actionTypes";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setHeaderToken(localStorage.token);

  try {
    const response = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: response.data.payload,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Sign Up user
export const signUpAction =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
      const response = await axios.post("/api/user/signUp", body, config);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data.payload,
      });
      dispatch(loadUser());
    } catch (err) {
      const error = err.response.data.message;
      if (error) alertify.notify(error, "error", 3);

      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

// Sign In user
export const signInAction =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const response = await axios.post("/api/user/signIn", body, config);

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: response.data.payload,
      });
      dispatch(loadUser());
    } catch (err) {
      const error = err.response.data.message;
      if (error) alertify.notify(error, "error", 3);

      dispatch({
        type: SIGNIN_FAIL,
      });
    }
  };

// Sign out
export const signOutAction = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: SIGNOUT });
};

// Change user password
export const changePasswordAction =
  ({ oldPassword, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ oldPassword, password });

    try {
      const response = await axios.post(
        "/api/user/changePassword",
        body,
        config
      );

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: CLEAR_PROFILES });
      dispatch({ type: CHANGE_PASSWORD });
      alertify.notify(response.data.message, "success", 3);
    } catch (err) {
      const error = err.response.data.message;
      if (error) alertify.notify(error, "error", 3);
    }
  };
