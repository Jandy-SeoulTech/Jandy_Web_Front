/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography } from '@material-ui/core';
import ChannelTalkContainer from '../../containers/channel/ChannelTalkContainer';
import { ReactComponent as TalkIcon } from '../../lib/assets/talkIcon.svg';
import palette from '../../lib/styles/palette';

const ChannelTalk = ({ channel }) => {
  return (
    <Box css={talkWrapper}>
      <Box css={talkTitle}>
        <Typography>자유로운 대화 </Typography>
        <TalkIcon css={{ marginLeft: '0.5625rem' }} />
      </Box>
      <ChannelTalkContainer channel={channel} />
    </Box>
  );
};

const talkWrapper = css`
  width: 34.875rem;
  height: 55.9375rem;
  background: ${palette.white};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const talkTitle = css`
  color: ${palette.white};
  height: 3.125rem;
  background: #474747;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 1.25rem;
  z-index: 1;

  .MuiTypography-root {
    font-family: 'Noto Sans KR';
    font-weight: 600;
    font-size: 1.125rem;
  }
`;

export default ChannelTalk;
