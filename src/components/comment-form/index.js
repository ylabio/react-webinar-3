import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function CommentForm({
  onSubmit = () => {},
  cancel,
  title,
  onCancel = () => {},
  placeholder,
  t,
}) {
  const cn = bem('CommentForm');

  const [text, setText] = useState('');

  const callbacks = {
    onSubmit: e => {
      e.preventDefault();
      if (!text.trim()) {
        return;
      }
      onSubmit(text);
      setText('');
      onCancel();
    },
    onChange: e => setText(e.target.value),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h3 className={cn('title')}>
        {t('comment.new')} {title}
      </h3>
      <textarea
        onChange={callbacks.onChange}
        value={text}
        name="text"
        placeholder={placeholder}
        className={cn('textarea')}
        required
      ></textarea>
      <div className={cn('buttons')}>
        <Button type="submit" style={'primary'} title={t('comment.send')} />
        {cancel && (
          <Button
            onClick={onCancel}
            className={cn('cancel')}
            style={'cancel'}
            title={t('comment.cancel')}
          ></Button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  cancel: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CommentForm;
