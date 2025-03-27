import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Item = ({ item, onClick, buttonText, quantity }) => {
  const cn = bem('Item');

  const handleClick = () => onClick(item.code);

  return (
    <article className={cn()}>
      <h2 className={cn('title')}>{item.title}</h2>
      <div className={cn('textBlock', { spacing: quantity === 0 })}>
        {quantity > 0 && <p className={cn('text')}>{quantity} шт.</p>}
        <p className={cn('price')}>{item.price} ₽</p>
      </div>
      <div className={cn('actions')}>
        <Controls onClick={handleClick} buttonText={buttonText} />
      </div>
    </article>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  buttonText: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Item);
