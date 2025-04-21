import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function CommentForm({ parentId, onSubmit, onCancel, isSubmitting, depth = 0, t }) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text, parentId, parentId ? 'comment' : 'article');
    setText('');
  };

  const handleCancel = (e) => {
    e?.preventDefault();
    onCancel();
  };

  return (
    <div>
      <form 
        className={cn()}
        onSubmit={handleSubmit}
        style={{ marginLeft: `${depth * 40}px` }}
      >
        <h3 className={cn('Title')}>
          {parentId ? t('comments.newReply') : t('comments.newComment')}
        </h3>

        <div className={cn('Border')}>
          <textarea
            className={cn('Textarea')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className={cn('Buttons')}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            title={t('comments.submit')}
            style="primary"
            type="submit"
            disabled={!text.trim() || isSubmitting}
          />
          {onCancel && (
            <Button
              onClick={handleCancel}
              title={t('comments.cancel')}
              style="outline"
              type="button"
              disabled={isSubmitting}
            />
          )}
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isSubmitting: PropTypes.bool,
  depth: PropTypes.number,
  t: PropTypes.func.isRequired
};

export default memo(CommentForm);
