import React, { memo, useCallback, useState } from 'react';
import Button from '../button';
import './style.css';

const Textarea = ({
  // postComment = () => {},
  title = '',
  parentType = 'comment',
  onPost = () => {},
  onCancel = () => {},
  postCommentText = '',
  setPostCommentText = () => {},
  t = z => {},
}) => {

  const callbacks = {
    onChange: useCallback((e) => {
      setPostCommentText(e.target.value);
    }, [postCommentText]),
  }

  return (
    <div className="textarea-c">
      <h4>{title}</h4>
      <textarea value={postCommentText} onChange={callbacks.onChange} />
      <div className="textarea-c-buttons">
        <Button style="primary" title={t('comments.button-send')} onClick={onPost} />
        {parentType === 'comment' && <Button style="outline" title={t('comments.button-cancel')} onClick={onCancel} />}
      </div>
    </div>
  );
};

export default memo(Textarea);
