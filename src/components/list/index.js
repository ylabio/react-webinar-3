import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { formatNumber } from '../../utils';

function List(props) {
  const calcTotal = () => props.list.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <ul className="List">
      <li className="Scroll" data-list-type={props.listType}>
        {props.list?.map(item => (
          <li key={item.code} className="List-item">
            <Item item={item} listType={props.listType} onClick={props.onHandleButton} />
          </li>
        ))}
      </li>
      {props.listType === 'cart' && (
        <li className="List-total">
          <div className="List-total-item">
            <b className="List-total-title">Итого:</b>
            <b className="List-total-amount">{formatNumber({ number: calcTotal() })}</b>
          </div>
        </li>
      )}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  listType: PropTypes.oneOf(['list', 'cart']),
  onHandleButton: PropTypes.func,
};

export default React.memo(List);
