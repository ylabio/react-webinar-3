import {memo, useLayoutEffect, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm(props) {
  const {text, value, onChange, onClick, t, children} = props;

  // Внутренний стейт для быстрого отображения ввода
  const [textValue, setTextValue] = useState(value);

  // Обработчик изменений в поле
  const handleChange = (event) => {
    setTextValue(event.target.value);
    onChange(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setTextValue(value), [value]);

  const cn = bem('CommentForm');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Новый {text}</h2>
      <textarea 
        value={textValue}
        onChange={handleChange}
        className={cn('form')} 
      />
      <div className={cn('articles')}>
        <button onClick={onClick}>{t('comments.send')}</button>
        {children}
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  t: PropTypes.func,
  children: PropTypes.node,
}

CommentForm.defaultProps = {
  onChange: () => {},
  onClick: () => {},
  t: (text) => text,
}

export default memo(CommentForm);