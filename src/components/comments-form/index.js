import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatCommentText from '../../utils/format-comment-text';

function CommentsForm({id, isRoot, onSubmit, onCancel, error, autoFocus}) {
  const cn = bem('CommentsForm');
  const [userText, setUserText] = useState('');
  const [notice, setNotice] = useState('');

  const onChangeText = (event) => {
    setUserText(event.target.value);
    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = formatCommentText(userText);
    if (!text) return setNotice('Введите текст ' + (isRoot ? 'комментария' : 'ответа'));
    onSubmit({
      text,
      id,
      isRoot,
    });
  };

  const title = 'Новый ' + (isRoot ? 'комментарий' : 'ответ');
  const placeholder = 'Текст ' + (isRoot ? 'комментария' : 'ответа');

  return (
    <form
      className={cn({root: isRoot})}
      id={id}
    >
      <h4 className={cn('title', {root: isRoot})}>{title}</h4>
      <textarea
        className={cn('text')}
        value={userText}
        onChange={onChangeText}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
      <div className={cn('controls')}>
        <button
          className={cn('controls-submit')}
          type='submit'
          onClick={handleSubmit}
        >
          {'Отправить'}
        </button>
        {!isRoot && (
          <button
            className={cn('controls-cancel')}
            type='reset'
            onClick={onCancel}
          >
            {'Отмена'}
          </button>
        )}
        {error && <span className={cn('error')}>{error}</span>}
        <span className={cn('notice')}>{notice}</span>
      </div>
    </form>
  );
}

CommentsForm.propTypes = {
  id: PropTypes.string,
  isRoot: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  error: PropTypes.any,
  autoFocus: PropTypes.bool,
};

Comment.defaultProps = {
  onSubmit: (e) => {
    e.preventDefault();
  },
  onCancel: (e) => {
    e.preventDefault();
  },
};

export default memo(CommentsForm);
