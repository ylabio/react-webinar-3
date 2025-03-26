import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, onClick }) {
  const cn = bem('List');
  return (
    <ul className={cn()}>
      {list.map(item => (
        <li key={item.code} className={cn('item')}>
          <Item item={item} onClick={() => onClick(item)} />
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
};

export default React.memo(List);
