import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SIGNOUT,
  DELETE_ACCOUNT,
  CHANGE_PASSWORD,
} from "../actions/actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  isLoaded: false,
  user: null,
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        isLoaded: true,
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        isLoaded: true,
      };
    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
    case AUTH_ERROR:
    case SIGNOUT:
    case DELETE_ACCOUNT:
    case CHANGE_PASSWORD:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        isLoaded: true,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
