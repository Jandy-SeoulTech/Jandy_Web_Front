/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import palette from '../../lib/styles/palette';
import TagBox from '../common/TagBox';
import { TagInput } from '../TextField';

const WellTalent = ({ wellTalent, handleChangeFiled }) => {
  const handleCreateTalent = (input) => {
    handleChangeFiled({
      key: 'wellTalent',
      value: wellTalent.concat(input),
    });
  };

  const handleDeleteTalent = (index) => {
    handleChangeFiled({
      key: 'wellTalent',
      value: wellTalent.filter((talent, i) => index !== i),
    });
  };

  return (
    <>
      <Typography css={title}>
        당신이 <span>잘하는 재능</span>을 알려주세요
      </Typography>

      <TagBox tagList={wellTalent} onClick={handleDeleteTalent} />

      <TagInput autoFocus tagList={wellTalent} onCreate={handleCreateTalent} css={talentInput} />
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

const talentInput = css`
  width: 21.875rem;
  margin-top: 7.75rem;
  .MuiInputLabel-root {
    color: black !important;
  }
`;

export default WellTalent;
