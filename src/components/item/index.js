import React from "react";
import PropTypes from "prop-types";
import {priceFormatter} from "../../utils";
import './style.css';

function Item({item, buttonAction, buttonLabel}) {

  const callbacks = {
    doAction: () => {
      buttonAction(item)
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-actions'>
        <div className='Item-price'> {priceFormatter(item.price)} ₽</div>
        {item.amount && <div className='Item-amount'>{item.amount} шт</div>}
        <button className="Item-button" onClick={callbacks.doAction}>{buttonLabel}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  doAction: PropTypes.func,
  buttonLabel: PropTypes.string,  
};

Item.defaultProps = {
  doAction: () => {},
}

export default React.memo(Item);
