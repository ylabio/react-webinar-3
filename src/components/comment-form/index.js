import { memo, useState } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ parentId, type, onReply, onSubmit, t }) {
  const [commentText, setCommentText] = useState('');

  const cn = bem('CommentForm');

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(commentText.trim() === '') return;
    onSubmit({
      "text": commentText,
      "parent": { "_id": parentId, "_type": type }
    });
    setCommentText('');
    onReply(null);
  };

  return (
    <form id="new_comment" className={cn()} onSubmit={handleSubmit}>
      <h5 className={cn('title')}>{t('comment.new_comment')}</h5>
      <textarea
        cols="30"
        rows="10"
        placeholder={t("comment.text")}
        value={commentText}
        onChange={handleCommentChange}
      />
      <div className={cn('btn-wrapper')}>
        <button type='submit'>{t('comment.submit')}</button>
        {type === 'comment' &&
          <button onClick={() => onReply(null)}>{t('comment.cancel')}</button>
        }
      </div>
    </form>
  )
}

export default memo(CommentForm);