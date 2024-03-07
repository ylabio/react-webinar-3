import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

/**
 *  Функция для создания элемента списка
 * @param {Object} props - объект пропсов
 * @param {Array} props.list - Массив с объектами товаров
 * @param {Function} props.buttonFunction - функция для передачи кнопке
 * @param {String} props.buttonTitle - надпись на кнопке внутри элемента списка
 * @returns разметка
 */
function List({list, buttonTitle, buttonFunction}) {
  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          <Item item={item} buttonFunction={buttonFunction} buttonTitle={buttonTitle} />
        </li>
      )}
    </ul>
  )
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonFunction: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
};

List.defaultProps = {
  buttonTitle: 'Кнопка',
};

export default React.memo(List);
