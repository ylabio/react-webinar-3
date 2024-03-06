import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import BasketItem from "../basket-item";
import {formatPrice} from "../../utils";


function Basket(props) {

  const totalPrice = formatPrice(props.basket.totalPrice)

  return (
    <div className='Basket'>{
      props.basket.items.map(item =>
        <div key={item.code} className='Basket-items'>
          <BasketItem showModal={props.showModal} item={item} onDeleteItemFromBasket={props.onDeleteItemFromBasket}/>
        </div>
      )}
      <div className='Basket-total-price'>
        <div>Итого</div>
        <div>{totalPrice}</div>
      </div>
    </div>
  )
}


Basket.propTypes = {
  showModal: PropTypes.bool,
  basket: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
      price: PropTypes.number
    })).isRequired,
    totalPrice:PropTypes.number
  }).isRequired,
  onDeleteItemFromBasket: PropTypes.func
};

Basket.defaultProps = {
  onDeleteItemFromBasket: () => {
  },
};

export default React.memo(Basket);