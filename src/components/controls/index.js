import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
import './style.css';

/**
 *  Функция для создания области управления
 * @param {Object} props - объект пропсов
 * @param {String} props.title - Надпись передшествующая выводу информации
 * @param {Function} props.onToggleCart - функция показа/скрытия модалки
 * @param {Node} props.children - разметка которую стоит поместить внутрь компонента
 * @returns разметка
 */
function Controls({title, onToggleCart, children}) {
  return (
    <div className='Controls'>
      <div className='Controls-info'>
        {children}
      </div>
      <div className='Controls-buttons'>
        <Button title={title} buttonFunction={onToggleCart} />
      </div>
    </div>
  )
};

Controls.propTypes = {
  title: PropTypes.string.isRequired,
  onToggleCart: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(Controls);
