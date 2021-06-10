import {
  ADD_POST,
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_POSTS,
} from "../actions/actionTypes";

const initState = {
  post: null,
  posts: [],
  isLoaded: false,
  error: {},
};

const postReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        isLoaded: true,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        posts: [],
        isLoaded: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        isLoaded: true,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        isLoaded: true,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        isLoaded: true,
      };
    case DELETE_POST:
      return {
        ...state,
        isLoaded: true,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        post: { ...state.post, likes: payload },
        isLoaded: true,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        isLoaded: true,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        isLoaded: true,
      };
    default:
      return state;
  }
};

export default postReducer;
