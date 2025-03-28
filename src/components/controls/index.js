import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ cart }) {
  const getFullSum = (arr) => {
    return arr.reduce((sum, item) => {
      return sum + (item.count * item.price);
    }, 0);
  }

  const getFullCount = (arr) => {
    return arr.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
  }

  const getMessage = () => {
    if (!cart.length) {
      return 'Пусто';
    }
    const count = getFullCount(cart);
    const message = `${count} ${plural(count, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    })} / ${getFullSum(cart).toLocaleString()} ₽`;
    return message;
  }

  return (
    <div className="Controls">
      <button>{getMessage()}</button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
};

Controls.defaultProps = {
  cart: [],
};

export default React.memo(Controls);
