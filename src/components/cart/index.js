import React from 'react';
import PropTypes from 'prop-types';
import { IconCart } from '../icon';
import { plural, formatPrice } from '../../utils';
import { STRINGS } from '../../const';
import './style.css';

function Cart({ totalQuantity, totalAmount, toggleCartModal = () => {} }) {

  const title = React.useMemo(() => getCartTitle(totalQuantity, totalAmount), [totalQuantity, totalAmount]);

  return (
    <div className="Cart">
      <div className="Cart-container" onClick={toggleCartModal}>
        <IconCart />
        <div className="Cart-title">{title}</div>
      </div>
    </div>
  );
}

function getCartTitle(totalQuantity, totalAmount) {
  const cost = formatPrice(totalAmount);

  if (totalQuantity === 0) return STRINGS.EMPTY;

  return `${totalQuantity} ${plural(totalQuantity, STRINGS.PRODUCT_COUNT_FORMS)} / ${cost}`;
}

Cart.propTypes = {
  totalQuantity: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  toggleCartModal: PropTypes.func,
};

export default React.memo(Cart);
