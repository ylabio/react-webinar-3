import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils"

function Controls({ totalCount, totalPrice }) {
  return (
    <div className="Controls">
      <p className="Controls-info">
        В корзине:<span className="Controls-total">
          {!totalCount
            ? "пусто"
            : `${totalCount} ${plural(totalCount, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${totalPrice.toLocaleString("ru-RU", { 
              currency: "RUB",
              style: "currency",
              minimumFractionDigits: 0
            })}`}
        </span>
      </p>
      <button>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  totalCount: 0,
  totalPrice: 0
}

export default React.memo(Controls);
