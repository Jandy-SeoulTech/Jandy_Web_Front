import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/util/createRequestSaga';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE] =
  createRequestActionTypes('profile/CHANGE_PASSWORD');
const [CHECK_PASSWORD, CHECK_PASSWORD_SUCCESS, CHECK_PASSWORD_FAILURE] =
  createRequestActionTypes('profile/CHECK_PASSWORD');
const [GET_REVIEWS, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAILURE] =
  createRequestActionTypes('profile/GET_REVIEWS');
const [GET_FOLLOWINGS, GET_FOLLOWINGS_SUCCESS, GET_FOLLOWINGS_FAILURE] =
  createRequestActionTypes('profile/GET_FOLLOWINGS');
const [GET_FOLLOWERS, GET_FOLLOWERS_SUCCESS, GET_FOLLOWERS_FAILURE] =
  createRequestActionTypes('profile/GET_FOLLOWERS');
const PROFILE_UNFOLLOW = 'profile/UNFOLLOW';
const PROFILE_FOLLOW = 'profile/FOLLOW';
const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('profile/GET_PROFILE');
const INIT_PROFILE = 'profile/INIT_PROFILE';

export const changePassword = createAction(CHANGE_PASSWORD, ({ password }) => ({
  password,
}));
export const checkPassword = createAction(CHECK_PASSWORD, ({ password }) => ({
  password,
}));
export const getReviews = createAction(GET_REVIEWS, ({ userId }) => ({
  userId,
}));
export const getFollowings = createAction(GET_FOLLOWINGS, ({ userId }) => ({
  userId,
}));
export const getFollowers = createAction(GET_FOLLOWERS, ({ userId }) => ({
  userId,
}));
export const profileUnfollow = createAction(
  PROFILE_UNFOLLOW,
  ({ followingId, isMe }) => ({
    followingId,
    isMe,
  }),
);
export const profileFollow = createAction(
  PROFILE_FOLLOW,
  ({ followingId, isMe }) => ({
    followingId,
    isMe,
  }),
);
export const getProfile = createAction(GET_PROFILE, ({ userId }) => ({
  userId,
}));
export const initProfile = createAction(INIT_PROFILE);

const changePasswordSaga = createRequestSaga(
  CHANGE_PASSWORD,
  profileAPI.changePassword,
);
const checkPasswordSaga = createRequestSaga(
  CHECK_PASSWORD,
  profileAPI.checkPassword,
);
const getReviewsSaga = createRequestSaga(GET_REVIEWS, profileAPI.getReviews);
const getFollowingsSaga = createRequestSaga(
  GET_FOLLOWINGS,
  profileAPI.getFollowings,
);
const getFollowersSaga = createRequestSaga(
  GET_FOLLOWERS,
  profileAPI.getFollowers,
);
const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile);

export function* profileSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
  yield takeLatest(CHECK_PASSWORD, checkPasswordSaga);
  yield takeLatest(GET_REVIEWS, getReviewsSaga);
  yield takeLatest(GET_FOLLOWINGS, getFollowingsSaga);
  yield takeLatest(GET_FOLLOWERS, getFollowersSaga);
  yield takeLatest(GET_PROFILE, getProfileSaga);
}

const initialState = {
  changedPassword: null,
  checkedPassword: null,
  reviews: [],
  followings: [],
  followers: [],
  profile: null,
  error: null,
};

const profile = handleActions(
  {
    [CHANGE_PASSWORD_SUCCESS]: (state, { payload: changedPassword }) => ({
      ...state,
      changedPassword: true,
    }),
    [CHANGE_PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      changedPassword: false,
      error,
    }),
    [CHECK_PASSWORD_SUCCESS]: (state, { payload: checkedPassword }) => ({
      ...state,
      checkedPassword: true,
    }),
    [CHECK_PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      checkedPassword: false,
      error,
    }),
    [PROFILE_UNFOLLOW]: (state, { payload: { followingId, isMe } }) => ({
      ...state,
      profile: {
        ...state.profile,
        ...(isMe
          ? {
              followings: state.profile.followings.filter(
                (el) => el.followingId !== followingId,
              ),
            }
          : {
              followers: state.profile.followers.filter(
                (el) => el.followerId !== followingId,
              ),
            }),
      },
    }),
    [PROFILE_FOLLOW]: (state, { payload: { followingId, isMe } }) => ({
      ...state,
      profile: {
        ...state.profile,
        ...(isMe
          ? {
              followings: state.profile.followings.concat([
                { followingId: followingId },
              ]),
            }
          : {
              followers: state.profile.followers.concat([
                { followerId: followingId },
              ]),
            }),
      },
    }),
    [GET_REVIEWS_SUCCESS]: (state, { payload: reviews }) => ({
      ...state,
      reviews,
    }),
    [GET_REVIEWS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_FOLLOWINGS_SUCCESS]: (state, { payload: followings }) => ({
      ...state,
      followings,
    }),
    [GET_FOLLOWINGS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_FOLLOWERS_SUCCESS]: (state, { payload: followers }) => ({
      ...state,
      followers,
    }),
    [GET_FOLLOWERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      profile,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_PROFILE]: () => initialState,
  },
  initialState,
);

export default profile;
