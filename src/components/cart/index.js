import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ calculateItems, calculateSum }) {
  return (
    <div className="Cart">
      В Корзине:
      <span className="Cart-content">
        {calculateItems() ? `${calculateItems()} товар / ` : "Пусто"}
          { calculateSum()!==0 &&
            <div>
              {` ${calculateSum()} P`}
            </div>
        }
      </span>
    </div>
  );
}
Cart.propTypes = {
  calculateSum: PropTypes.func.isRequired,
  calculateItems: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  calculateSum: () => {},
  calculateItems: () => {},
};

export default React.memo(Cart);
