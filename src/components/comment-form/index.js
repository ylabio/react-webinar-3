import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function CommentForm({ onSubmit, t = text => text, replyTo, onCancel }) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
  }, [replyTo]);

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <div className={cn('text')}>
        {replyTo ? t('comment.addReply') : t('comment.addComment')}
      </div>
      <textarea
        className={cn('input')}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={replyTo ? t('comment.replyPlaceholder') : t('comment.placeholder')}
        rows={3}
      />
      <div className={cn('buttons')}>
        <Button 
          style="primary" 
          type="submit" 
          title={t('comment.submit')}
        />
        {replyTo && (
          <Button 
            style="outline" 
            onClick={onCancel} 
            title={t('comment.cancel')}
          />
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
  replyTo: PropTypes.string,
  onCancel: PropTypes.func,
};

export default memo(CommentForm);