import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({ list, onClick, buttonTitle }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} buttonTitle={buttonTitle} onClick={onClick} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
};

export default React.memo(List);
