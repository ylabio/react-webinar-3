import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsForm({id, isRoot, onSubmit, onCancel, error}) {
  const cn = bem('CommentsForm');
  const [text, setText] = useState('');

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      text,
      id,
      isRoot,
    });
  };

  const title = 'Новый ' + (isRoot ? 'комментарий' : 'ответ');
  const placeholder = 'Текст ' + (isRoot ? 'комментария' : 'ответа');

  return (
    <form className={cn({root: isRoot})}>
      <h4 className={cn('title', {root: isRoot})}>{title}</h4>
      <textarea
        className={cn('text')}
        value={text}
        onChange={onChangeText}
        autoFocus={!isRoot}
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
      </div>
    </form>
  );
}

CommentsForm.propTypes = {
  id: PropTypes.string,
  isRoot: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  link: PropTypes.string,
  error: PropTypes.any,
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
