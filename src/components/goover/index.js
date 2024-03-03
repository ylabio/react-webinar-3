import React from "react";
import PropTypes from 'prop-types';
import {plural} from "../../utils";
import Controls from "../controls/";
import './style.css';

function GoOver({ onOpen, totalItems, totalPrice }) {
  return (
    <div className="GoOver">
       <div className="GoOver-Text">В корзине: <span>{totalItems > 0 ? `\u00A0 ${totalItems} ${plural(totalItems, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
        })} / ${totalPrice} ₽`: "\u00A0 пусто"}</span>
      </div>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  );
}

GoOver.propTypes = {
  onOpen: PropTypes.func,
};

GoOver.defaultProps = {
  onOpen: () => {},
}

export default React.memo(GoOver);
