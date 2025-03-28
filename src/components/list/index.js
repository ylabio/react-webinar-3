import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({
  list,
  callbacks = { onRemFromBasket: () => {}, onAddToBasket: () => {} },
  theme = 'default',
}) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {list?.length >= 1 ? (
        list.map(item => (
          <li key={item.code} className={cn('item')}>
            <Item item={item} callbacks={callbacks} theme={theme} />
          </li>
        ))
      ) : (
        <div className={cn('empty')}>Корзина пуста, выберите товар</div>
      )}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  theme: PropTypes.oneOf(['delete', 'default']),
  callbacks: PropTypes.shape({
    onRemFromBasket: PropTypes.func,
    onAddToBasket: PropTypes.func,
  }),
};

export default React.memo(List);
