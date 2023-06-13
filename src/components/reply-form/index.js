import { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ReplyForm(props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);

  // Обработчик изменений в поле
  const callbacks = {
    onChange: useCallback((event) => {
      setError(null);
      setValue(event.target.value);
    }),
    onSubmit: useCallback((event) => {
      event.preventDefault();
      if (value.trim().length === 0) return setError('required');
      props.onSubmit(value.trim());
      setValue(() => '');
    }),
  };

  useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }, []);

  const cn = bem('ReplyForm');

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h3 className={cn('title')}>{props.title}</h3>
      <textarea
        className={cn('input')}
        type='textarea'
        name='text'
        value={value}
        onChange={callbacks.onChange}
        required
        ref={props.type === 'comment' ? textareaRef : null}
      />
      {error && <div>Заполните это поле</div>}
      <div>
        <button className={cn('btn')} type='submit'>
          {props.labelSend}
        </button>
        {props.labelCancel && (
          <button className={cn('btn')} onClick={props.onCancel}>
            {props.labelCancel}
          </button>
        )}
      </div>
    </form>
  );
}

ReplyForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};

ReplyForm.defaultProps = {
  onSubmit: () => {},
  title: 'Новый комментарий',
};

export default memo(ReplyForm);
