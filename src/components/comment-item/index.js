import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import dataFormate from '../../utils/date-format';
import Button from '../button';
import CommentsForm from '../comments-form';

function CommentItem({
  comment,
  onReply,
  showReplyForm,
  onFormChange,
  onFormSubmit,
  onFormCancel,
  formValue,
  t,
  authorizedUser,
}) {
  const cn = bem('CommentsList');
  
  return (
    <div className={cn('comments-container')} style={{ paddingLeft: `${Math.min(20, comment.depth) * 40}px` }}>
      <div className={cn('comments-container-name')}>
        <div
          className={cn(`name${authorizedUser === comment.author ? ' gray' : ''}`)}
        >
          {comment.author}
        </div>
        <div className={cn('date')}>{dataFormate(comment.dateCreate)}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      
      <Button
        style={'text_comments'}
        title={t('article.answer')}
        onClick={onReply}
      />
      
      {showReplyForm && (
        <div className={cn('reply-form')}>
          <CommentsForm
            title={t('article.new-answer')}
            titleButtonSend={t('article.send')}
            titleButtonCancel={t('article.cancel')}
            onChange={onFormChange}
            onClick={onFormSubmit}
            onClickCancel={onFormCancel}
            value={formValue}
          />
        </div>
      )}
    </div>
  );
}

export default memo(CommentItem);
