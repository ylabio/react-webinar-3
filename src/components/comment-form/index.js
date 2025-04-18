import { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function CommentForm({ onSubmit = () => {}, cancel, title, id, onCancel = () => {}, placeholder }) {
  const cn = bem('CommentForm');

  const [text, setText] = useState('');

  const callbacks = {
    onSubmit: e => {
      e.preventDefault();
      if (!text.trim()) {
        return;
      }
      onSubmit(text, id);
      setText('');
      onCancel();
    },
    onChange: e => setText(e.target.value),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h3 className={cn('title')}>Новый {title}</h3>
      <textarea
        onChange={callbacks.onChange}
        value={text}
        name="text"
        placeholder={placeholder}
        className={cn('textarea')}
        required
      ></textarea>
      <div className={cn('buttons')}>
        <Button type="submit" style={'primary'} title="Отправить" />
        {cancel && (
          <Button
            onClick={onCancel}
            className={cn('cancel')}
            style={'cancel'}
            title="Отмена"
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
