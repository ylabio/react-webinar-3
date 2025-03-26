import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, onClick, buttonText, quantity }) {
  const cn = bem('List');
  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          <Item item={item} onClick={onClick} buttonText={buttonText} quantity={quantity} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default React.memo(List);
