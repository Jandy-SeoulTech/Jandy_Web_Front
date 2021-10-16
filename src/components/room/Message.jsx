/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { memo } from 'react';
import palette from '../../lib/styles/palette';
import { ReactComponent as ReplyWhite } from '../../lib/assets/replyWhite.svg';
import { ReactComponent as ReplyBlack } from '../../lib/assets/replyBlack.svg';
import { ReactComponent as ReplyButton } from '../../lib/assets/replyButton.svg';

const Message = ({ message, isContinue, right, isMe, isLast, admin, onReply }) => {
  return (
    <Box css={chatItemWrapper}>
      {!isContinue && (
        <Box css={userWrapper(right)}>
          {right && <Typography>{message.sendUser.nickname}</Typography>}
          <Avatar src={message.sendUser['profile'] && message.sendUser.profile.profileImage} />
          {!right && <Typography>{message.sendUser.nickname}</Typography>}
        </Box>
      )}
      <Box css={{ display: 'flex', alignItems: 'flex-end' }}>
        {right && isLast && (
          <Typography css={time(right)}>
            {new Date(message.createdAt).toLocaleTimeString()}
          </Typography>
        )}
        <Box css={[messageWrapper({ isContinue, right, isMe, admin }), css``]}>
          {message.answeredId && (
            <>
              <Typography className="answer">{message.answeredMessage.content}</Typography>
            </>
          )}
          <Box css={{ display: 'flex', alignItems: 'center' }}>
            {!admin && isMe
              ? message.answeredId && <ReplyWhite />
              : message.answeredId && <ReplyBlack />}
            <Typography>{message.content}</Typography>
            <ReplyButton
              onClick={() => {
                onReply(message);
              }}
              className="replyButton"
            />
          </Box>
        </Box>
        {!right && isLast && (
          <Typography css={time(right)}>
            {new Date(message.createdAt).toLocaleTimeString()}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const chatItemWrapper = css`
  width: 100%;
  margin-top: 0.84rem;
`;

const userWrapper = (right) => css`
  display: flex;
  align-items: center;
  justify-content: ${right && 'flex-end'};
  margin: ${right ? '0 2rem 0 0' : '0 0 0 2rem'};
  .MuiAvatar-root {
    width: 3.34rem;
    height: 3.34rem;
    box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.15);
  }
  .MuiTypography-root {
    font-family: 'Noto Sans KR';
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    margin: ${right ? '0 0.9rem 0 0' : '0 0 0 0.9rem'};
    margin-bottom: 0.67rem;
  }
`;

const time = (right) => css`
  flex: 1;
  text-align: ${right ? 'right' : 'left'};
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 1.167;
  color: #5f5f5f;
`;

const messageWrapper = ({ isContinue, right, isMe, admin }) => css`
  max-width: 70%;
  padding: 0.84rem;
  color: ${!admin && isMe && palette.white};
  background: ${!admin && isMe ? 'rgba(255, 81, 27, 0.8);' : '#f0f0f0'};
  margin: ${right ? '0 6rem 0 auto' : '0 auto 0 6rem'};
  border-radius: ${isContinue ? '20px' : right ? '20px 3px 20px 20px;' : '3px 20px 20px 20px;'};
  border: ${admin && '2px solid #04BD9E'};
  .MuiTypography-root {
    min-height: 2rem;
    font-family: 'Barlow', 'Noto Sans KR';
    letter-spacing: 0;
    word-wrap: break-word;
    white-space: pre-line;
    font-size: 1.167rem;
  }
  .answer {
    font-size: 1rem;
    color: ${!admin && isMe ? 'rgba(255, 255, 255, 0.8)' : '#5F5F5F'};
    padding-bottom: 0.25rem;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid ${!admin && isMe ? palette.white : '#5F5F5F'};
  }
  .replyButton {
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    cursor: pointer;
    display: none;
    flex-shrink: 0;
  }
  &:hover {
    .replyButton {
      display: block;
    }
  }
`;

export default memo(Message);
