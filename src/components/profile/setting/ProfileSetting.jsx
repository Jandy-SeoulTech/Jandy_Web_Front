/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, TextareaAutosize, Typography } from '@material-ui/core';
import palette from '../../../lib/styles/palette';
import { useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '../../common/TextField';
import Button from '../../common/Button';
import { isNickname, isPassword } from '../../../lib/util/validate';
import { useInView } from 'react-intersection-observer';
import UploadImageContainer from '../../../containers/common/UploadImageContainer';

const ProfileSetting = ({
  user,
  onCheckNickname,
  nicknameDuplicateError,
  onUpdateProfile,
  onChangePassword,
  onCheckPassword,
  updatedProfile,
  checkedPassword,
  changedPassword,
}) => {
  const options = { threshold: 0.5 };
  const [profileRef, isProfileInView] = useInView(options);
  const [passwordRef, isPasswordInView] = useInView(options);
  const [alarmRef, isAlarmInView] = useInView(options);

  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [department, setDepartment] = useState('');
  const [wellTalent, setWellTalent] = useState([]);
  const [interestTalent, setInterestTalent] = useState([]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setIntroduce(user.profile.introduce);
      setDepartment(user.profile.department);
      setWellTalent(user.profile.wellTalent.map((talent) => talent.contents));
      setInterestTalent(user.profile.interestTalent.map((talent) => talent.contents));
    }
  }, [user]);

  const [nicknameFormatError, setNicknameFormatError] = useState(false);
  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    if (!nickname) {
      setNicknameFormatError(true);
    } else if (isNickname(nickname)) {
      setNicknameFormatError(false);
      onCheckNickname({ nickname });
    } else {
      setNicknameFormatError(true);
    }
  };

  const [introLengthError, setIntroLengthError] = useState(false);
  const handleChangeIntro = (e) => {
    if (e.target.value.length > 500) {
      setIntroLengthError(true);
    } else {
      setIntroLengthError(false);
      setIntroduce(e.target.value);
    }
  };

  const [departmentLengthError, setDepartmentLengthError] = useState(false);
  const handleChangeDepartment = (e) => {
    if (e.target.value.length > 20) {
      setDepartmentLengthError(true);
    } else {
      setDepartmentLengthError(false);
      setDepartment(e.target.value);
    }
  };

  const [wellInput, setWellInput] = useState('');
  const [wellLengthError, setWellLengthError] = useState(false);

  const handleChangeWellTalent = (e) => {
    if (e.target.value.length > 10) {
      setWellLengthError(true);
    } else {
      setWellLengthError(false);
      setWellInput(e.target.value);
    }
  };

  const handleWellKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateWellTalent(wellInput.trim());
    }
  };

  const handleCreateWellTalent = (value) => {
    if (value.length > 0 && value.length <= 10 && wellTalent.length < 10) {
      setWellTalent(wellTalent.concat(value));
      setWellInput('');
    }
  };

  const handleDeleteWellTalent = (i) => {
    setWellTalent(wellTalent.filter((talent) => talent !== wellTalent[i]));
  };

  const [interestInput, setInterestInput] = useState('');
  const [interestLengthError, setInterestLengthError] = useState(false);

  const handleChangeInterestTalent = (e) => {
    if (e.target.value.length > 10) {
      setInterestLengthError(true);
    } else {
      setInterestLengthError(false);
      setInterestInput(e.target.value);
    }
  };

  const handleInterestKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateInterestTalent(interestInput.trim());
    }
  };

  const handleCreateInterestTalent = (value) => {
    if (value.length > 0 && value.length <= 10 && interestTalent.length < 10) {
      setInterestTalent(interestTalent.concat(value));
      setInterestInput('');
    }
  };

  const handleDeleteInterestTalent = (i) => {
    setInterestTalent(interestTalent.filter((talent) => talent !== interestTalent[i]));
  };

  const handleEditProfile = () => {
    onUpdateProfile({
      nickname,
      department,
      introduce,
      wellTalent,
      interestTalent,
    });
  };

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordCheckError, setNewPasswordCheckError] = useState(false);

  const handleChangePassword = () => {
    if (oldPassword === '') {
      setOldPasswordError(true);
    } else if (newPassword === '' || !isPassword(newPassword)) {
      setNewPasswordError(true);
    } else if (newPasswordCheck !== newPassword) {
      setNewPasswordCheckError(true);
    } else if (!newPasswordError && !newPasswordCheckError) {
      onCheckPassword({ password: oldPassword });
    }
  };

  useEffect(() => {
    if (checkedPassword) {
      onChangePassword({ password: newPassword });
    }
  }, [checkedPassword]);

  if (!user) {
    return <div>?????????..</div>;
  }

  if (user) {
    return (
      <Grid container justifyContent="center" css={profileSettingWrapper}>
        <Grid item container css={{ width: '1200px' }}>
          <Grid item css={profileSettingNav}>
            <Typography
              className={isProfileInView ? 'current' : ''}
              onClick={() => (window.location.href = '/setting#profile')}
            >
              ????????? ??????
            </Typography>
            {user.provider === 'local' && (
              <Typography
                className={isPasswordInView && !isProfileInView ? 'current' : ''}
                onClick={() => (window.location.href = '/setting#password')}
              >
                ???????????? ??????
              </Typography>
            )}
            <Typography
              className={isAlarmInView && !isProfileInView && !isPasswordInView ? 'current' : ''}
              onClick={() => (window.location.href = '/setting#alarm')}
            >
              ?????? ??????
            </Typography>
          </Grid>
          <Grid item container css={profileSettingContents}>
            <Grid id="profile" ref={profileRef} item container css={profileSettingContent}>
              <Grid xs={4} item>
                <Grid xs={12} container justifyContent="center">
                  <UploadImageContainer />
                </Grid>
                <Grid xs={12} container justifyContent="center">
                  <Typography css={{ marginTop: '25px' }}>{user.email}</Typography>
                </Grid>
              </Grid>
              <Grid xs={8} item container css={profileContentWrapper} spacing={2}>
                <Grid item>
                  <Typography>?????????</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder="10??? ??????"
                    error={
                      nicknameFormatError || (nicknameDuplicateError && nickname !== user.nickname)
                    }
                    helperText={
                      (nicknameFormatError && '???????????? ?????? ??????????????????.') ||
                      (nicknameDuplicateError &&
                        nickname !== user.nickname &&
                        '?????? ????????? ??????????????????.') ||
                      (!nicknameDuplicateError && '??? ?????? ????????? ??????????????????.')
                    }
                    value={nickname}
                    onChange={handleNicknameChange}
                    css={input}
                  />
                </Grid>
                <Grid item>
                  <Typography>?????? ??????</Typography>
                  <TextareaAutosize
                    placeholder="500??? ??????"
                    value={introduce}
                    minRows={10}
                    maxRows={16}
                    onChange={handleChangeIntro}
                    css={introduceForm(introLengthError)}
                  />
                  {introLengthError && (
                    <Typography sx={{ color: 'red', fontSize: '0.75rem' }}>
                      ????????? ????????? ?????????????????????. (500??? ??????)
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Typography>??????</Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    fullWidth
                    placeholder="20??? ??????"
                    value={department}
                    onChange={handleChangeDepartment}
                    error={departmentLengthError}
                    helperText={
                      departmentLengthError && '????????? ????????? ?????????????????????. (20??? ??????)'
                    }
                    css={input}
                  />
                </Grid>
                <Grid item>
                  <Typography>????????? ??????</Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    label=""
                    fullWidth
                    value={wellInput}
                    onChange={handleChangeWellTalent}
                    onKeyPress={handleWellKeyPress}
                    error={wellTalent.length >= 10 || wellLengthError}
                    helperText={
                      wellTalent.length >= 10
                        ? '????????? ????????? ??? ????????????.'
                        : wellLengthError && '10??? ????????? ??????????????????'
                    }
                    css={input}
                  />
                  <Grid container spacing={1} css={talentWrapper}>
                    {wellTalent.map((talent, i) => (
                      <Grid item key={i}>
                        <Box
                          onClick={() => {
                            handleDeleteWellTalent(i);
                          }}
                        >
                          <Typography>{talent}</Typography>
                          <ClearIcon className="cancelIcon" />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>?????? ?????? ??????</Typography>
                  <TextField
                    size="small"
                    variant="outlined"
                    label=""
                    fullWidth
                    value={interestInput}
                    onChange={handleChangeInterestTalent}
                    onKeyPress={handleInterestKeyPress}
                    error={interestTalent.length >= 10 || interestLengthError}
                    helperText={
                      interestTalent.length >= 10
                        ? '????????? ????????? ??? ????????????.'
                        : interestLengthError && '10??? ????????? ??????????????????'
                    }
                    css={input}
                  />
                  <Grid container spacing={1} css={talentWrapper}>
                    {interestTalent.map((talent, i) => (
                      <Grid item key={i}>
                        <Box
                          onClick={() => {
                            handleDeleteInterestTalent(i);
                          }}
                        >
                          <Typography>{talent}</Typography>
                          <ClearIcon className="cancelIcon" />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                {updatedProfile && (
                  <Grid item>
                    <Typography textAlign="center">??? ???????????? ??????????????????.</Typography>
                  </Grid>
                )}
                <Grid item>
                  <Button css={submitButton} onClick={handleEditProfile}>
                    ?????? ?????? ??????
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {user.provider === 'local' && (
              <Grid id="password" ref={passwordRef} item container css={profileSettingContent}>
                <Grid xs={4} item></Grid>
                <Grid xs={8} item container css={profileContentWrapper} spacing={1.875}>
                  <Grid item>
                    <Typography>?????? ????????????</Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      type="password"
                      value={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                        setOldPasswordError(false);
                      }}
                      error={oldPasswordError || checkedPassword === false}
                      helperText={
                        (oldPasswordError && '?????? ??????????????? ??????????????????.') ||
                        (checkedPassword === false && '?????? ??????????????? ???????????? ????????????.')
                      }
                      css={input}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>??? ????????????</Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setNewPasswordError(false);
                      }}
                      error={newPasswordError || changedPassword === false}
                      helperText={
                        (newPasswordError || changedPassword === false) &&
                        '?????? + ?????? 8?????? ?????? ??????????????????.'
                      }
                      css={input}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>??? ???????????? ??????</Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      type="password"
                      value={newPasswordCheck}
                      onChange={(e) => {
                        setNewPasswordCheck(e.target.value);
                        setNewPasswordCheckError(false);
                      }}
                      error={newPasswordCheckError}
                      helperText={newPasswordCheckError && '??? ??????????????? ???????????? ????????????.'}
                      css={input}
                    />
                  </Grid>
                  {changedPassword && (
                    <Grid item>
                      <Typography textAlign="center">??? ??????????????? ??????????????????.</Typography>
                    </Grid>
                  )}
                  <Grid item>
                    <Button css={submitButton} onClick={handleChangePassword}>
                      ?????? ?????? ??????
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid id="alarm" ref={alarmRef} item css={profileSettingContent} height="800px"></Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

const profileSettingWrapper = css`
  margin-top: 60px;
  background-color: #f0f0f0;
`;

const profileSettingNav = css`
  width: 267px;
  height: fit-content;
  background-color: ${palette.white};
  margin: 1rem;
  position: fixed;
  transition: all ease 1s;
  font-weight: 500;
  font-size: 20px;
  font-family: 'Noto Sans KR';
  .MuiTypography-root {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
  }
  .current {
    border-left: 7px solid ${palette.orange};
    color: ${palette.orange};
    font-weight: 700;
  }
`;
const profileSettingContents = css`
  width: 850px;
  margin: 1rem;
  margin-left: 300px;
  flex-direction: column;
  background-color: #f0f0f0;
`;
const profileSettingContent = css`
  margin-bottom: 50px;
  background-color: ${palette.white};
  padding: 75px 50px;
`;

const profileContentWrapper = css`
  flex-direction: column;
  & > .MuiGrid-root {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`;

const dragSenser = (isDragging) => css`
  width: 11.25rem;
  height: 11.25rem;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  background-color: ${isDragging && 'rgba(0, 0, 0, 0.3)'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const currentImage = css`
  position: absolute;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  z-index: 1;
`;

const cancelImage = css`
  width: 2.5rem;
  height: 2.5rem;
  left: 8.1875rem;
  top: 8.1875rem;
  position: absolute;
  cursor: pointer;
  z-index: 3;
`;

const input = css`
  height: 39px;
  margin-bottom: 7px;
  .MuiInput-root {
    &::before {
      border-bottom: 1px solid ${palette.black} !important;
    }
    &::after {
      border-bottom: 2px solid ${palette.black} !important;
    }
  }
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 16px;
  }
  .MuiInputLabel-root.Mui-focused {
    color: black;
    font-size: 16px !important;
  }
`;

const introduceForm = (lengthError) => css`
  width: 100%;
  height: 15.625rem;
  background: #f0f0f0;
  font-size: 0.875rem;
  font-family: 'Barlow', 'Noto Sans KR';
  font-weight: 500;
  padding: 0.9375rem 0.75rem;
  resize: none;
  outline: ${lengthError && '1px solid red'};
  &:focus-visible {
    outline: ${lengthError ? '2px solid red !important;' : '2px solid black !important;'};
  }
`;

const talentWrapper = css`
  margin-top: 35px;
  flex-wrap: wrap;
  background-color: #e0e0e0;
  padding: 10px 18px 18px 10px;
  border-radius: 5px;
  .MuiBox-root {
    display: flex;
    align-items: center;
    height: 1.625rem;

    background: #7b7b7b;
    border: 1px solid #7b7b7b;
    border-radius: 20px;
    padding: 0.3125rem 0.625rem;

    .MuiTypography-root {
      color: ${palette.white};
      font-family: 'Barlow', 'Noto Sans KR';
      font-size: 0.75rem;
      text-align: center;
    }
    .cancelIcon {
      width: 0.8rem;
      height: 0.8rem;
      color: #7b7b7b;
      margin-left: 0.4375rem;
      display: none;
    }

    &:hover {
      cursor: pointer;
      background: rgba(130, 130, 130, 0.3);
      border: 1px solid #7b7b7b;
      .cancelIcon {
        display: block;
      }
      .MuiTypography-root {
        color: ${palette.black};
      }
    }
  }
`;

const submitButton = css`
  width: 100%;
  height: 60px;
  margin-top: 70px;
  border-radius: 50px;
  background-color: black;
  color: white;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
`;

export default ProfileSetting;
