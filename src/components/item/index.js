import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Currency from "../../currencySymbol.js";

function Item(props) {
  return (
    (props.action == 0 ? 
      <div className='Item'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>
          {props.item.title} 
        </div>
        <div className='Item-price'>
          <Currency currency="rub" value={props.item.price}/>
        </div>
        <div className='Item-actions'>
          <button onClick={() => props.onFunc(props.item.code)}>
            Добавить
          </button>
        </div>
      </div>
     : 
     <div className='Item'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title-basket'>
          {props.item.title} 
        </div>
        <div className='Item-price-basket'>
          <Currency currency="rub" value={props.item.price}/>
        </div>
        <div className='Item-q-product'>
          {props.qproduct}
          {' шт'}
        </div>
        <div className='Item-actions'>
          <button onClick={() => props.onFunc(props.item.code)}>
            Удалить
          </button>
        </div>
      </div>)
  )
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  qproduct: PropTypes.number,
  onFunc: PropTypes.func,
  action: PropTypes.number
};

Item.defaultProps = {
  onFunc: () => {
  },
}

export default React.memo(Item);
