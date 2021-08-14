import { Avatar, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import KakaoLogin from 'react-kakao-login';
import { Link } from 'react-router-dom';
import { isEmail } from '../../lib/util/validate';
import GoogleLogin from 'react-google-login';
import TextField from '../common/TextField';
import Button from '../common/Button';

const Signin = ({ onLogin, errorMessage, onKakaoOauth, onGoogleOauth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === '') setEmailError(false);
    else setEmailError(!isEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!email) alert('이메일을 입력해주세요');
    if (!password) alert('비밀번호를 입력해주세요');
    if (emailError) return;
    onLogin({ email, password });
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: 'url(https://source.unsplash.com/800x600/?talk)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Grid>
      <Grid item container md={6} xs={12} p={5} alignItems="center">
        <Grid
          item
          container
          sx={{ height: 'fit-content' }}
          justifyContent="center"
        >
          <Grid item xs={10}>
            <Typography variant="h4" textAlign="center">
              로그인
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography textAlign="center" mb={2}>
              <Link to="/signup">Upgle이 처음이신가요? 간편 가입하기</Link>
            </Typography>
          </Grid>

          <Grid item xs={8} mb={4}>
            <TextField
              size="small"
              fullWidth
              label="Email"
              error={emailError}
              helperText={emailError && '잘못된 이메일 형식입니다.'}
              value={email}
              onChange={handleEmailChange}
              type="email"
            ></TextField>
          </Grid>

          <Grid item xs={8} mb={4}>
            <TextField
              size="small"
              fullWidth
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            ></TextField>
          </Grid>
          <Grid item xs={8}>
            <Button variant="contained" fullWidth onClick={handleLogin}>
              Signin
            </Button>
          </Grid>
          <Grid item container xs={8} mt={2}>
            <Grid item container xs={4} justifyContent="center">
              <KakaoLogin
                useLoginForm={true}
                token={process.env.REACT_APP_KAKAO_SECRET}
                onSuccess={(result) => {
                  console.log(result);
                  onKakaoOauth(result.response.access_token);
                }}
                onFail={(result) => console.log(result)}
                render={(props) => <Avatar {...props}></Avatar>}
              ></KakaoLogin>
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(props) => <Avatar {...props}></Avatar>}
                onSuccess={(result) => onGoogleOauth(result.accessToken)}
                onFailure={(result) => console.log(result)}
                cookiePolicy={'single_host_origin'}
              />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Avatar id="naverIdLogin"></Avatar>
            </Grid>
          </Grid>
          {errorMessage && (
            <Grid item xs={8}>
              <Typography textAlign="center" mt={2} sx={{ color: 'red' }}>
                {errorMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;
