import React from "react";
import PropTypes from "prop-types";
import {getRubPriceInt} from "../../utils";
import './style.css';

function Item({ item, itemButtonsAction, itemButtonsName, children }) {

  const {code, title, price} = item;

  const callbacks = {
    onItemButtonAction: (e) => {
      e.stopPropagation();
      itemButtonsAction(item.code);
    }
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{code}</div>
      <div className='Item-title'>{title}</div>
      <div className="Item-price">{getRubPriceInt(price)}</div>
      {children}
      <div className='Item-actions'>
        <button onClick={callbacks.onItemButtonAction}>
          {itemButtonsName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  itemButtonsAction: PropTypes.func,
  itemButtonsName: PropTypes.string,
  children: PropTypes.node
};

Item.defaultProps = {
  itemButtonsAction: () => {},
}

export default React.memo(Item);
