import { memo, useState } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ parentId, type, author, onReply, onSubmit, t }) {
  const [commentText, setCommentText] = useState(
    type === 'comment' ? `${t('comment.my_reply_to')} ${author}` : ''
  );

  const cn = bem('CommentForm');

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      "text": commentText,
      "parent": { "_id": parentId, "_type": type }
    });
    setCommentText('');
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
        {parentId !== null &&
          <button onClick={() => onReply(null)}>{t('comment.cancel')}</button>
        }
      </div>
    </form>
  )
}

export default memo(CommentForm);