import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls(props) {
  
  let count = props.orders.length
  let total = props.orders.reduce((sum, order) => sum + order.price, 0);
  return (
    <div className="Controls">
      <div className="Controls-text">
        <span>В корзине:</span>
        <span className="Controls-price">{`${count>0 ?
        `${`${count} ${plural(count, {
          one: " товар",
          few: " товара",
          many: " товаров",
        })} / ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`}` : 'пусто'}
      `}</span>
      </div>
      <button onClick={() => props.setActive(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  openModal: PropTypes.func
};

Controls.defaultProps = {
  openModal: () => {}
}

export default React.memo(Controls);
