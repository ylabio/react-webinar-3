import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({basket, totalPrice, setModalShow}){

  return (
    <div className="Controls">
      <div className="Controls-count">
        В корзине: 
        <b>
          {basket.length ? `
            ${basket.length}
            ${plural(basket.length, {one: 'товар', few: 'товара', many: 'товаров'})} /
            ${Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumSignificantDigits: 1}).format(totalPrice)}` 
          : "пусто"}
        </b>
      </div>

      <button className="Controls-btn" onClick={() => setModalShow(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  setModalShow: PropTypes.func
};

Controls.defaultProps = {
  basket: [],
  totalPrice: 0,
  setModalShow: () => {},
}

export default React.memo(Controls);
