import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Icon from '../icons';
import { plural } from '../../utils';

function Controls({ order, onOpenBasket }) {
  const getBasketTitle = () => {
    if (!order?.items?.length) return 'Пусто';

    const pluralVariants = { one: 'товар', few: 'товара', many: 'товаров' };
    const countText = `${order.items.length} ${plural(order.items.length, pluralVariants)}`;
    const priceText = `${order.total.toLocaleString('ru-RU')} ₽`;

    return `${countText} / ${priceText}`;
  };
  return (
    <div className="Controls">
      <button onClick={() => onOpenBasket()}>
        <Icon className="icon" width="24" height="24" />
        {getBasketTitle()}
      </button>
    </div>
  );
}

Controls.propTypes = {
  order: PropTypes.shape({
    items: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  onOpenBasket: PropTypes.func.isRequired,
};

export default React.memo(Controls);
