/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { TextField } from '../TextField';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import editorConfig from '../../lib/util/editorConfig';
import { useRef } from 'react';

const EditPost = ({ post, channel, user, onWriteChannelPost, handleChangeFiled, imageHook }) => {
  const editorRef = useRef();

  const onTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      handleChangeFiled({ key: 'title', value: e.target.value });
    }
  };

  const onIsNoticeChange = (e) => {
    handleChangeFiled({ key: 'status', value: e.target.checked ? 'Notice' : 'Close' });
  };

  return (
    <Grid container justifyContent="center" css={wrapper}>
      <Box css={{ width: '71.25rem', display: 'flex', flexDirection: 'column' }}>
        <TextField
          css={titleInput}
          value={post.title}
          placeholder="제목을 입력해주세요."
          multiline={true}
          onChange={onTitleChange}
        />
        <Box css={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user.id === channel.adminId && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={post.status === 'Notice'}
                  css={checkBox}
                  onChange={onIsNoticeChange}
                />
              }
              label="공지로 설정"
            />
          )}
        </Box>
        <Box css={editorConfig.editorCss}>
          <Editor
            ref={editorRef}
            onChange={(e) => {
              handleChangeFiled({
                key: 'content',
                value: editorRef.current.getInstance().getMarkdown(),
              });
            }}
            language="ko"
            initialValue={post.content}
            placeholder={post.content.length === 0 && '재능공유 요청을 작성해주세요'}
            initialEditType="wysiwyg"
            previewStyle="vertical"
            height="calc(100vh - 13.4375rem)"
            useCommandShortcut={true}
            customHTMLRenderer={editorConfig.renderer}
            hooks={{ addImageBlobHook: imageHook }}
          />
        </Box>
        <Grid container justifyContent="flex-end">
          <Button
            css={submitBtn}
            onClick={onWriteChannelPost}
            disabled={!post.title || !post.content}
          >
            작성 완료
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

const wrapper = css`
  margin-top: 8.4375rem;
  background-color: #fafafc;
  padding: 0 calc((100% - 71.25rem) / 2);
  padding-bottom: 6rem;
  font-size: 1.875rem;
`;

const titleInput = css`
  height: fit-content;
  min-height: 4.375rem;
  textarea {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 2.125rem;
    line-height: 3.125rem;
  }
  margin-top: 1.875rem;
`;

const checkBox = css`
  &.Mui-checked {
    color: ${palette.orange};
  }
`;

const submitBtn = css`
  margin: 1.25rem 0 1.25rem 0;
  width: 12.5rem;
  height: 3.5625rem;
  border-radius: 6.25rem;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 1.25rem;
  background: #000000;
  color: #ffffff;

  &:disabled {
    background: #e0e0e0;
    color: white;
    border: 0;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
  }
`;

export default EditPost;
