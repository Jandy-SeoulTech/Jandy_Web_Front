/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import palette from '../../lib/styles/palette';
import { TextArea } from '../TextField';

const Introduce = ({ introduce, handleChangeFiled }) => {
  const handleCahnge = (e) => {
    handleChangeFiled({
      key: 'introduce',
      value: e.target.value,
    });
  };
  return (
    <>
      <Typography css={title}>간단하게 자신에 대해 소개해주세요</Typography>
      <TextArea
        autoFocus
        minRows={10}
        maxRows={16}
        maxLength={500}
        value={introduce}
        onChange={handleCahnge}
        css={introduceInput}
      />
    </>
  );
};

const title = css`
  font-family: 'Barlow', 'Noto Sans KR';
  font-size: 1.25rem;
  font-weight: 700;
  span {
    color: ${palette.orange};
  }
`;

const introduceInput = css`
  width: 21.875rem;
  height: 15.625rem;
  margin-top: 4.6875rem;
  background: #f0f0f0;
`;

export default Introduce;
