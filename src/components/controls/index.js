import React from "react";
import PropTypes from "prop-types";
import { countAllPrices, formatNumbers, plural } from "../../utils";
import "./style.css";

function Controls({ onToggle, basket }) {
  const product = plural(basket.length, {
    one: "товар",
    few: "товара",
    many: "товаров",
  });

  return (
    <div className="Controls">
      <p>В корзине:</p>
      <p className="Controls-count">
        {basket.length > 0 ? (
          <>
            {basket.length} {product} /{" "}
            {formatNumbers(countAllPrices(basket), {
              style: "currency",
              currency: "RUB",
            })}
          </>
        ) : (
          "Пусто"
        )}
      </p>
      <div className="Controls-actions">
        <button onClick={() => onToggle(true)}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onToggle: PropTypes.func,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      selected: PropTypes.bool,
      count: PropTypes.number,
    })
  ).isRequired,
};

Controls.defaultProps = {
  onToggle: () => {},
  basket: [],
};

export default React.memo(Controls);
