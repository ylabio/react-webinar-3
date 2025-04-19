import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';

function CommentNew({ status, onSubmit, onCancel }) {
  const cn = bem('CommentNew');
  const { t } = useTranslate();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <label htmlFor="new-comment" className={cn('label')}>
        {status === 'global' ? t('comments.title-form-global') : t('comments.title-form')}
      </label>
      <textarea
        className={cn('textarea')}
        id="new-comment"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      />
      <div className={cn('action')}>
        <Button title={t('comments.send')} style="primary" type="submit" />
        {status !== 'global' && (
          <Button
            title={t('comments.reset')}
            style="primary"
            type="button"
            onClick={() => {
              setCommentText('');
              if (onCancel) onCancel();
            }}
          />
        )}
      </div>
    </form>
  );
}

CommentNew.propTypes = {
  status: PropTypes.oneOf(['global', 'reply']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default memo(CommentNew);
