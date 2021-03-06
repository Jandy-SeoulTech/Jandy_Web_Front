import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import EditChannel from '../../components/channel/EditChannel';
import { initImage, setProfileImage } from '../../modules/image';
import { check } from '../../modules/user';
import { changeChannel, createChannel, initialize, updateChannel } from '../../modules/write';

const EditChannelContainer = (props) => {
  const { writeChannel } = useSelector((state) => state.write);
  const { id: channelId } = useSelector((state) => state.write.writeChannel);
  const { profileImage } = useSelector((state) => state.image);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeFiled = ({ key, value }) => {
    dispatch(changeChannel({ key, value }));
  };

  const editChannel = async () => {
    try {
      if (writeChannel.id) {
        await dispatch(
          updateChannel({
            userId: user.id,
            channelId,
            ...writeChannel,
            category: writeChannel.category.id,
            src: profileImage,
          }),
        );
      } else {
        await dispatch(
          createChannel({
            userId: user.id,
            ...writeChannel,
            category: writeChannel.category.id,
            src: profileImage,
          }),
        );
      }
      dispatch(check());
      history.push('/myChannel');
      alert('등록이 완료됐습니다!');
    } catch {
      alert('등록을 실패했습니다.');
    }
  };

  useEffect(() => {
    if (channelId) {
      dispatch(setProfileImage(writeChannel.src));
    }
  }, [channelId]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
      dispatch(initImage());
    };
  }, [dispatch]);

  return (
    <EditChannel
      writeChannel={writeChannel}
      handleChangeFiled={handleChangeFiled}
      editChannel={editChannel}
    />
  );
};
export default EditChannelContainer;
