import axios from "axios";
import alertify from "alertifyjs";
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

// Add post
export const addPostAction = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post("/api/post/add", formData, config);
    dispatch({
      type: ADD_POST,
      payload: response.data.payload,
    });
    alertify.notify(response.data.message, "success", 3);
    history.push("/Posts");
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Get posts
export const getAllPostsAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_POSTS });
  try {
    const response = await axios.get("/api/post/all");
    dispatch({
      type: GET_POSTS,
      payload: response.data.payload,
    });
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Get all posts of a single user
export const getUserAllPostsAction = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_POSTS });
  try {
    const response = await axios.get(`/api/post/all/${id}`);
    dispatch({
      type: GET_POSTS,
      payload: response.data.payload,
    });
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Get single post
export const getSinglePostAction = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: response.data.payload,
    });
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Like a post
export const addLikeAction = (postID) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/post/like/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: response.data.payload,
    });
    alertify.notify(response.data.message, "success", 3);
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Unlike a post
export const removeLikeAction = (postID) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/post/unlike/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: response.data.payload,
    });
    alertify.notify(response.data.message, "success", 3);
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Add a comment
export const addCommentAction = (postID, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `/api/post/comment/${postID}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: response.data.payload,
    });
    alertify.notify(response.data.message, "success", 3);
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Remove a comment
export const removeCommentAction = (postID, commentID) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/post/comment/${postID}/${commentID}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentID,
    });
    alertify.notify(response.data.message, "success", 3);
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};

// Delete post
export const deletePostAction = (id, history) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
    });
    alertify.notify(response.data.message, "success", 3);
    history.push("/Posts");
  } catch (err) {
    const error = err.response.data.message;
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    if (error) alertify.notify(error, "error", 3);
  }
};
