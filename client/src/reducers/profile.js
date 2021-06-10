import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILES,
} from "../actions/actionTypes";

const initState = {
  profile: null,
  profiles: [],
  isLoaded: false,
  error: {},
};

const profileReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoaded: true,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        isLoaded: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        isLoaded: true,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        isLoaded: true,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
        isLoaded: true,
      };
    default:
      return state;
  }
};

export default profileReducer;
