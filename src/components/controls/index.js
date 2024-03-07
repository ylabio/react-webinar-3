import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls(props) {
  
  return (
    <div className="Controls">
      <div className="Controls-text">
        <span>В корзине:</span>
        <span className="Controls-price">
        {props.countOrders > 0 ? `${props.countOrders}`+ 
         plural(props.countOrders, {
          one: " товар / ",
          few: " товара / ",
          many: " товаров / ",
        }) : ''} 
        {props.totalPrice}
      </span>
      </div>
      <div className="Controls-actions">
      <button onClick={() => props.setActive(true)}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  setActive: PropTypes.func,
};

Controls.defaultProps = {
  setActive: () => {},
}

export default React.memo(Controls);
