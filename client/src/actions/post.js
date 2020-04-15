import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  CLEAR_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_POSTS,
  LESS_POSTS,
  MORE_POSTS,
} from './types';

// GET posts

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
    const res = await axios.get('/api/post');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Post by Post Id
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove posts by userId
export const removePostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
    // dispatch({ type: CLEAR_POSTS });
    const res = await axios.get(`/api/post/user/${id}`);

    dispatch({
      type: LESS_POSTS,
      payload: res.data.map((post) => post._id),
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET more posts by userId
export const getMorePostsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
    // dispatch({ type: CLEAR_POSTS });
    const res = await axios.get(`/api/post/user/${id}`);

    dispatch({
      type: MORE_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// GET posts by userId

export const getPostsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
    // dispatch({ type: CLEAR_POSTS });
    const res = await axios.get(`/api/post/user/${id}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var { address } = formData;

  var platform = new window.H.service.Platform({
    apikey: '5p2ZKQVCUNnZt9kBR4wDC0Encjv7w8k5ZBm4vzS_8zw',
  });

  var service = platform.getGeocodingService();

  const geocoder = (query) => {
    return new Promise((resolve, reject) => {
      service.geocode(
        {
          searchtext: query,
        },
        (success) => {
          resolve(success.Response.View[0].Result[0].Location.DisplayPosition);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const start = async () => {
    const coords = await geocoder(address);
    formData.lat = coords.Latitude;
    formData.lng = coords.Longitude;
    console.log(formData.lat);
    console.log(formData.lng);
  };

  try {
    await start();
    const res = await axios.post(`/api/post`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));

    history.push('posts');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.likes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.likes },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      `/api/post/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data.comments,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/delcomment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
