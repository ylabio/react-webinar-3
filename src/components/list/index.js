import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { formatNumber } from '../../utils';

function List(props) {
  const total = props.list.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <ul className="List">
      {props.list.map(item => (
        <li key={item.code} className="List-item">
          <Item item={item} listType={props.listType} />
        </li>
      ))}
      {props.listType === 'cart' && (
        <li className="List-total">
          <b>Итого: {formatNumber({ number: total })}</b>
        </li>
      )}
    </ul>
  );
}
// TODO
List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  listType: PropTypes.oneOf(['list', 'cart']),
};

export default React.memo(List);
