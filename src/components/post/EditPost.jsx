/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { TextField } from '../TextField';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { useRef, useState } from 'react';
import editorConfig from '../../lib/util/editorConfig';

const EditPost = ({ channel, user, onWriteChannelPost, initialValue }) => {
  const editorRef = useRef();
  const [title, setTitle] = useState('');
  const [isNotice, setIsNotice] = useState(false);

  const onTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setTitle(value);
    }
  };

  const onIsNoticeChange = (e) => {
    setIsNotice(e.target.checked);
  };

  const onSubmit = async () => {
    const content = editorRef.current.getInstance().getMarkdown();
    await onWriteChannelPost({
      channelId: channel.id,
      title,
      status: isNotice ? 'Notice' : 'Close',
      content,
      images: [],
    });
  };

  return (
    <Grid container justifyContent="center" css={wrapper}>
      <Box css={{ width: '1140px', display: 'flex', flexDirection: 'column' }}>
        <TextField
          css={titleInput}
          value={title}
          placeholder="제목을 입력해주세요."
          multiline={true}
          onChange={onTitleChange}
        />
        <Box css={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user.id === channel.adminId && (
            <FormControlLabel
              control={<Checkbox css={checkBox} onChange={onIsNoticeChange} />}
              label="공지로 설정"
            />
          )}
        </Box>
        <Box css={editorConfig.editorCss}>
          <Editor
            ref={editorRef}
            language="ko"
            initialValue={initialValue}
            initialEditType="wysiwyg"
            previewStyle="vertical"
            height="calc(100vh - 215px)"
            useCommandShortcut={true}
            customHTMLRenderer={editorConfig.renderer}
            hooks={editorConfig.hooks}
          />
        </Box>
        <Grid container justifyContent="flex-end">
          <Button css={submitBtn} onClick={onSubmit}>
            작성 완료
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

const wrapper = css`
  margin-top: 135px;
  background-color: #fafafc;
  font-size: 30px;
`;

const titleInput = css`
  height: fit-content;
  min-height: 70px;
  width: 1140px;
  textarea {
    font-family: 'Barlow', 'Noto Sans KR';
    font-weight: 500;
    font-size: 34px;
    line-height: 50px;
  }
  margin-top: 30px;
`;

const checkBox = css`
  &.Mui-checked {
    color: ${palette.orange};
  }
`;

const submitBtn = css`
  margin: 20px 0 20px 0;
  width: 100px;
  height: 40px;
  border-radius: 50px;
  font-family: 'Barlow', 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  background: #000000;
  color: #ffffff;
`;

export default EditPost;