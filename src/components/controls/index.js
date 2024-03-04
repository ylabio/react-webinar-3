import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { formatPrice, plural } from "../../utils"
function Controls({ total, openCart }) {
  return (
    <div className="Controls">
      <p className="Controls-info">
        В корзине:<span className="Controls-total">
          {!total.count
            ? "пусто"
            : `${total.count} ${plural(total.count, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${formatPrice(total.price)}`}
        </span>
      </p>
      <button onClick={() => openCart(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  total: PropTypes.shape({
    price: PropTypes.number,
    count: PropTypes.number
  }),
  openCart: PropTypes.func
};

Controls.defaultProps = {
  total: { price: 0, count: 0 },
  openCart: () => {}
}

export default React.memo(Controls);
