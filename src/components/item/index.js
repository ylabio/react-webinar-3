import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";

function Item(props) {
  const callbacks = {
    onAddToCart: () => {
      props.addToCart(props.item.code)
    },
    onDeleteFromCart: () => {
      props.deleteFromCart(props.item.code)
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price">
        {new Intl.NumberFormat('ru-RU', {style: 'currency', maximumFractionDigits: 0, currency: 'RUB'}).format(props.item.price)}
      </div>
      {props.item.count 
        ? <div className="Item-quantity">{props.item.count} шт</div> 
        : null
      }
      <div className='Item-actions'>
        {props.addToCart 
        ? <Button name='Добавить' onClick={callbacks.onAddToCart}></Button>
        : <Button name='Удалить' onClick={callbacks.onDeleteFromCart}></Button>          
        }
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
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,  
};

Item.defaultProps = {
  onAddToCart: () => {},
  deleteFromCart: () => {},
}

export default React.memo(Item);
