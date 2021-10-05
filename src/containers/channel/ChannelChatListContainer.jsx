import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelChatList from '../../components/channel/ChannelChatList';
import Loading from '../../components/common/Loading';
import { getChannelData } from '../../modules/channel';
import { getRoomList } from '../../modules/room';

const ChannelChatListContainer = ({ channelId }) => {
  const { channel } = useSelector((state) => state.channel);
  const { roomList } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomList(channelId));
    dispatch(getChannelData(channelId));
  }, [dispatch, channelId]);

  if (!channel || !roomList)
    return <Loading css={{ marginTop: '8.4375rem', backgroundColor: '#fafafc' }} />;

  return <ChannelChatList roomList={roomList} />;
};
export default ChannelChatListContainer;
