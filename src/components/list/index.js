import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAction = () => {}, style="add", isShowTotal = false }) {
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} onAction={onAction} style={style} />
        </li>
      ))}
      {isShowTotal && (
        <li className="List-total">
          <span>Итого</span>
          <span className="List-total-price">
            {list.length > 0
              ? list.reduce((acc, cur) => acc + cur.amount * cur.price, 0).toLocaleString('ru-RU')
              : 0}{' '}
            ₽
          </span>
        </li>
      )}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      amount: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  onAction: PropTypes.func,
  style: PropTypes.string,
  isShowTotal: PropTypes.bool,
};

export default React.memo(List);
