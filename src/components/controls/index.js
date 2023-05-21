import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ setActive, sumPrice, sumCount }) {
  return (
    <div className="Controls">
      <div className="Controls-info">
        <div className="Controls-basket">
          В корзине:&nbsp;<span className="Controls-count">{sumCount > 0 ? sumCount : 'пусто'}&nbsp;</span>
        </div>
        {sumCount > 0 ? <div className="Controls-price">товара&nbsp;/&nbsp;{sumPrice}  &#8381;</div>: '' }
      </div>
      <div className="Controls-action">
        <button className="Controls-button" onClick={() => setActive(true)}>Перейти</button>
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
