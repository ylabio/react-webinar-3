import React from "react";
import PropTypes from "prop-types";
import './style.css';

/**
 *  Функция для создания шапки
 * @param {Object} props - объект пропсов
 * @param {String} props.title - Надпись в шапке
 * @param {Node} props.children - разметка которую стоит поместить внутрь компонента
 * @returns разметка
 */
function Head({title, children}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {children}
    </div>
  )
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default React.memo(Head);
