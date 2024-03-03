import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ count, price, onAdd }) {
  return (
    <div className="Controls">
      <div className="Controls-title">
        В корзине:
        <b className="Controls-title-cart">
          {count ? `${count} товара / ${price} ₽` : "пусто"}
        </b>
      </div>
      <div className="Controls-actions">
        <button id="myBtn" className="Controls-button" onClick={() => onAdd()}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
