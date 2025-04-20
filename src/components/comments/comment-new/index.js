import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';

import Button from "../../button";
import './style.css';

function CommentNew({ status, onSubmit, onCancel, style }) {
  const cn = bem('CommentNew');
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setCommentText('');
  };

  const handleCancel = () => {
    setCommentText('');
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className={cn()} style={style}>
      <label htmlFor="new-comment" className={cn('label')}>
        {status === 'global' ? 'Новый комментарий' : 'Новый ответ'}
      </label>

      <textarea
        id="new-comment"
        className={cn('textarea')}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <div className={cn('action')}>
        <Button title="Отправить" style="primary" type="submit" />
        {status !== 'global' && (
          <Button title="Отмена" style="primary" type="button" onClick={handleCancel} />
        )}
      </div>
    </form>
  );
}

export default memo(CommentNew);
