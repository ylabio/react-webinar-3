import React from "react";
import PropTypes from "prop-types";
import {getRubPriceInt} from "../../utils";
import './style.css';

function Item({item, itemButtonsAction, itemButtonsName}) {

  const callbacks = {
    onItemButtonAction: (e) => {
      e.stopPropagation();
      itemButtonsAction(item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className="Item-price">{getRubPriceInt(item.price)}</div>
      {item.quantity
        ? <div className='Item-quantity'>
          {item.quantity} шт.
        </div>
        : ''
      }
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
};

Item.defaultProps = {
  itemButtonsAction: () => {},
}

export default React.memo(Item);
