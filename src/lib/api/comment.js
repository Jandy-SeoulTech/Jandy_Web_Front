import axios from 'axios';

export const writeComment = async ({ channelId, postId, content }) => {
  const response = await axios.post('/api/Comment', { channelId, postId, content });
  return response.data.data;
};

export const editComment = async ({ commentId, content }) => {
  const response = await axios.patch(`/api/Comment/${commentId}`, { content });
  return response.data.data;
};

export const deleteComment = async ({ commentId }) => {
  const response = await axios.delete(`/api/Comment/${commentId}`);
  return response.data.data;
};
