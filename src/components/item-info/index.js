import React from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';

function ItemInfo({ quantity, price, children }) {
  return (
    <div className="Item-container">
      {quantity !== undefined && <span className="item-span-left">{quantity} шт</span>}
      <span>{`${numberFormat(price)}`} ₽</span>
      {children}
    </div>
  );
}

ItemInfo.propTypes = {
  quantity: PropTypes.number,
  price: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default React.memo(ItemInfo);
