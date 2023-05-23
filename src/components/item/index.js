import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ItemProducts({ code, price, title, addItem }) {
  const cn = bem('Item-list');

  const onClickHandler = () => {
    addItem({ code, title, price });
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('price')}>{price.toLocaleString()}&nbsp;&#8381;</div>
      <div className={cn('actions')}>
        <button onClick={onClickHandler}>Добавить</button>
      </div>
    </div>
  );
}

ItemProducts.propTypes = {
  code: PropTypes.number,
  price: PropTypes.number,
  title: PropTypes.string,
  addItem: PropTypes.func,
};

ItemProducts.defaultProps = {
  addItem: () => {},
};

export default React.memo(ItemProducts);
