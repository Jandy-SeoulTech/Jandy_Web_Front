import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { check } from '../../../modules/user';
import { updateProfile } from '../../../modules/write';
import { checkNickname, initAuth } from '../../../modules/auth';
import ProfileSetting from '../../../components/profile/setting/ProfileSetting';
import { changePassword, checkPassword } from '../../../modules/profile';
import { initImage, setProfileImage } from '../../../modules/image';

const ProfileSettingContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { nicknameChecked } = useSelector((state) => state.auth);
  const { profileImage } = useSelector((state) => state.image);
  const { updatedProfile } = useSelector((state) => state.write);
  const { checkedPassword, changedPassword } = useSelector((state) => state.profile);

  const onChangePassword = ({ password }) => {
    dispatch(changePassword({ password }));
  };

  const onCheckPassword = ({ password }) => {
    dispatch(checkPassword({ password }));
  };

  const onUpdateProfile = async ({
    nickname,
    department,
    introduce,
    wellTalent,
    interestTalent,
  }) => {
    await dispatch(
      updateProfile({
        userId: user.id,
        nickname,
        department,
        introduce,
        wellTalent,
        interestTalent,
        src: profileImage,
      }),
    );
    dispatch(check());
  };

  const onCheckNickname = ({ nickname }) => {
    dispatch(checkNickname({ nickname }));
  };

  useEffect(() => {
    return () => {
      dispatch(initAuth());
      dispatch(initImage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(setProfileImage(user.profile.profileImage));
    }
  }, [dispatch, user]);

  return (
    <ProfileSetting
      user={user}
      onCheckNickname={onCheckNickname}
      nicknameDuplicateError={!nicknameChecked}
      onUpdateProfile={onUpdateProfile}
      onChangePassword={onChangePassword}
      onCheckPassword={onCheckPassword}
      updatedProfile={updatedProfile}
      checkedPassword={checkedPassword}
      changedPassword={changedPassword}
    />
  );
};

export default ProfileSettingContainer;
