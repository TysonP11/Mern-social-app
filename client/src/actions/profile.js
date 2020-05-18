import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    UPDATE_FOLLOW,
    CLEAR_POSTS,
    CLEAR_PROFILES
} from './types'

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        })
    } catch (err) {
        dispatch({ type: CLEAR_PROFILE })

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        console.log(formData)

        const res = await axios.post('/api/profile', formData, config)

        console.log(res)

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        })

        dispatch(
            setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
        )

        if (!edit) {
            history.push('/dashboard')
        }
    } catch (err) {
        console.log(err)

    //       if (errors) {
    //         errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    //       }

    //       dispatch({
    //         type: PROFILE_ERROR,
    //         payload: { msg: err.response.statusText, status: err.response.status },
    //       });
    }
}

// Delete account & profile

export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This CANNOT be undone')) {
        try {
            await axios.delete(`/api/profile/`)

            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: DELETE_ACCOUNT })

            dispatch(setAlert('Account Deleted', 'success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            })
        }
    }
}

// Get all Profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get('/api/profile/')

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// Get profile by userID

export const getProfileById = (userID) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userID}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// Follow
export const follow = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/profile/follow/${id}`)

        dispatch({
            type: UPDATE_FOLLOW,
            payload: {
                followedId: id,
                followingId: res.data.followingProfile._id,
                followers: res.data.followedProfile.followers,
                following: res.data.followingProfile.following,
            },
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// Unfollow
export const unFollow = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/profile/unfollow/${id}`)

        dispatch({
            type: UPDATE_FOLLOW,
            payload: {
                followedId: id,
                followingId: res.data.followingProfile._id,
                followers: res.data.followedProfile.followers,
                following: res.data.followingProfile.following,
            },
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// GET all followed profile
export const getFollowedProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: CLEAR_PROFILES })
    dispatch({ type: CLEAR_POSTS })
    
    try {
        const res = await axios.get('/api/profile/followedprofile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

