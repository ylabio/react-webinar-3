import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';
import cartIcon from '../../assets/fluent_cart-16-filled.png';

function Controls({ cartSummary = { totalCount: 0, totalPrice: 0 }, onClick = () => { } }) {
  return (
    <div className="Controls">
      <button onClick={() => onClick()}>
        <img src={cartIcon} />
        {!cartSummary.totalCount ? ' Пусто' : ` ${cartSummary.totalCount} ${plural(cartSummary.totalCount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })} / ${cartSummary.totalPrice} ₽`}
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartSummary: PropTypes.shape({
    totalCount: PropTypes.number,
    totalPrice: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

export default React.memo(Controls);
