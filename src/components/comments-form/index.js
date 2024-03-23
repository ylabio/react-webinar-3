import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsForm({id, isRoot, onSubmit, onCancel}) {
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
  const cn = bem('CommentsForm');
  return (
    <form className={cn()}>
      <textarea
        className={cn('text')}
        value={text}
        onChange={onChangeText}
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
      </div>
    </form>
  );
}

CommentsForm.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  }),
};

Comment.defaultProps = {};

export default memo(CommentsForm);
