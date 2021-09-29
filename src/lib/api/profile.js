import axios from 'axios';

export const getProfile = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const follow = async ({ followingId }) => {
  const response = await axios({
    url: `/api/Profile/follow`,
    method: 'POST',
    data: { followingId },
  });
  return response.data;
};

export const unfollow = async ({ followingId }) => {
  const response = await axios({
    url: `/api/Profile/unfollow`,
    method: 'POST',
    data: { followingId },
  });
  return response.data;
};

export const getFollowers = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/followerlist/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const getFollowings = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/followinglist/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const getReviews = async ({ userId }) => {
  const response = await axios({
    url: `/api/Profile/reviewlist/${userId}`,
    method: 'GET',
  });
  return response.data;
};

export const uploadProfile = async ({
  userId,
  department,
  introduce,
  wellTalent,
  interestTalent,
  src,
}) => {
  const response = await axios({
    url: '/api/Profile',
    method: 'POST',
    data: { userId, department, introduce, wellTalent, interestTalent, src },
  });
  return response.data;
};

export const updateProfile = async ({
  userId,
  nickname,
  department,
  introduce,
  wellTalent,
  interestTalent,
  src,
}) => {
  const response = await axios({
    url: '/api/Profile',
    method: 'PATCH',
    data: {
      userId,
      nickname,
      department,
      introduce,
      wellTalent,
      interestTalent,
      src,
    },
  });
  return response.data;
};

export const checkPassword = async ({ password }) => {
  const response = await axios({
    url: `/api/Profile/password`,
    method: 'POST',
    data: { password },
  });
  return response.data;
};

export const changePassword = async ({ password }) => {
  const response = await axios({
    url: `/api/Profile/password`,
    method: 'PATCH',
    data: { password },
  });
  return response.data;
};
