import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      {/* <button onClick={() => onAdd()}>Добавить</button> */}
      <div className="Controls-cart">В корзине:</div>
      <div className="Controls-count">
        {/* {count
          ? ` | Выделяли ${count} ${plural(count, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })}`
          : ""} */}
        2 товара / 223 ₽
      </div>
      <button className="Controls-button">Перейти</button>
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
