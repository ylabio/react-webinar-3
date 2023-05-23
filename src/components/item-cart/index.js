import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ItemCart({ code, title, price, cnt, deleteItem }) {
  const cn = bem('Item-list');

  const onClickHandler = () => {
    deleteItem({ code, price, cnt });
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('price')}>{price.toLocaleString()}&nbsp;&#8381;</div>
      <div className={cn('cnt')}>{cnt}&nbsp;шт</div>
      <div className={cn('actions')}>
        <button onClick={onClickHandler}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  code: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  cnt: PropTypes.number,
  deleteItem: PropTypes.func,
};

ItemCart.defaultProps = {
  deleteItem: () => {},
};

export default React.memo(ItemCart);
