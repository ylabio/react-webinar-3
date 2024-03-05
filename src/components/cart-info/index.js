import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function CartInfo({ title, calculateItems, calculateSum }) {
  return (
    <div className="CartInfo">
      {title}
      <span className="CartInfo-content">
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
CartInfo.propTypes = {
  title: PropTypes.string,
  calculateSum: PropTypes.func.isRequired,
  calculateItems: PropTypes.func.isRequired,
};

CartInfo.defaultProps = {
  title: 'Информация о заказе',
  calculateSum: () => {},
  calculateItems: () => {},
};

export default React.memo(CartInfo);
