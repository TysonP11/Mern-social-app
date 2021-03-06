import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  UPDATE_FOLLOW,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case UPDATE_FOLLOW:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile._id === payload.followedId
            ? { ...profile, followers: payload.followers }
            : profile._id === payload.followingId
            ? { ...profile, following: payload.following }
            : profile
        ),
        profile:
          state.profile !== null && state.profile._id === payload.followedId
            ? { ...state.profile, followers: payload.followers }
            : state.profile,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
