/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid, Typography } from '@material-ui/core';
import { getRandomColor } from '../../lib/util/random';

function ArchiveCard({ archive }) {
  return (
    <Grid item css={archiveCell}>
      <Grid
        css={archiveCard}
        sx={{
          backgroundColor: getRandomColor(archive.title),
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.510208) 75.52%, rgba(0, 0, 0, 0.79) 100%), url(${archive.imgUrl})`,
        }}
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '12.5px',
          }}
        >
          <Typography className="archiveTitle" gutterBottom component="div" sx={archiveTitle}>
            {archive.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Noto Sans KR',
              fontSize: '8px',
              width: 'fit-content',
              alignSelf: 'flex-end',
            }}
          >
            {archive.date}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const archiveCell = css`
  height: 256px;
`;

const archiveCard = css`
  width: 165px;
  height: 240px;
  cursor: pointer;
  border-radius: 5px;
  height: 100%;
  color: white;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  &:not(:hover) .archiveTitle {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const archiveTitle = css`
  font-family: 'Noto Sans KR', 'sans-serif' !important;
  transition: all ease 0.2s;
  font-size: 12px;
  font-weight: 700;
  width: 140px;
`;

export default ArchiveCard;
