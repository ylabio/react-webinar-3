import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function CommentForm({ onSubmit, onCancel, isReply }) {
  const [text, setText] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    await onSubmit(trimmed);
    setText('');
    if (onCancel) onCancel();
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <span>{isReply ? 'Новый ответ' : 'Новый комментарий'}</span>
      <textarea
        className="comment-form__textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <div className="comment-form__controls" style={{ marginTop: '0.5rem' }}>
        <Button type="submit" style="primary" title="Отправить" />
        {onCancel && <Button style="outline" onClick={onCancel} title="Отмена" />}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isReply: PropTypes.bool,
};

CommentForm.defaultProps = {
  onCancel: null,
  isReply: false,
};

export default memo(CommentForm);
