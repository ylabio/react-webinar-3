import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 *  Функция для создания модального окна
 * @param {Object} props - объект пропсов
 * @param {Node} props.children - разметка которую стоит поместить внутрь компонента
 * @returns разметка
 */
function Modal({children}) {
  return (
  <div className='Modal'>
    {children}
  </div>
  )
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);
