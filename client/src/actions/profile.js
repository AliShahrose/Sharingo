import axios from "axios";
import alertify from "alertifyjs";
import {
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  DELETE_ACCOUNT,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
} from "./actionTypes";

// Get current user profile
export const getCurrentProfileAction = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILE,
      payload: response.data.payload,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Get all profiles
export const getAllProfilesAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const response = await axios.get("/api/profile/all");

    dispatch({
      type: GET_PROFILES,
      payload: response.data.payload,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Get a single profile

export const getSingleProfileAction = (userID) => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILES,
  });
  try {
    const response = await axios.get(`/api/profile/${userID}`);

    dispatch({
      type: GET_PROFILE,
      payload: response.data.payload,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Create or update profile
export const createOrUpdateProfileAction =
  (formData, history) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/profile/add", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: response.data.payload,
      });

      alertify.notify(response.data.message, "success", 3);

      history.push("/Home");
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data.message,
      });
      alertify.notify(err.response.data.message, "error", 3);
    }
  };

// Delete account and profile
export const deleteAccountAction = () => async (dispatch) => {
  const deleteAccount = () => async () => {
    try {
      const response = await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      alertify.notify(response.data.message, "success", 3);
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  alertify
    .confirm("Delete Profile", "Are you sure?", deleteAccount(), function () {
      alertify.error("Account deletion cancelled");
    })
    .setting({
      labels: { ok: "YES", cancel: "NO" },
      closable: false,
    });
};
