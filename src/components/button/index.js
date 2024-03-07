import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 *  Функция для создания кнопки
 * @param {Object} props - объект пропсов
 * @param {String} props.title - подпись кнопки
 * @param {Function} props.buttonFunction - функция которая сработает при клике на кнопку
 * @returns разметка
 */
function Button({title, buttonFunction}) {
  return (
    <button className='Button' onClick={buttonFunction}>
      {title}
    </button>
  )
};

Button.propTypes = {
  title: PropTypes.string,
  buttonFunction: PropTypes.func.isRequired,
};

Button.defaultProps = {
  title: 'Кнопка',
};

export default React.memo(Button);
