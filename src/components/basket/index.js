import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import BasketItem from "../basket-item";


function Basket(props) {
  console.log('Basket:' ,props)
  return (
    <div className='Basket'>{
      props.basket.items.map(item =>
        <div key={item.code} className='Basket-layout'>
          <BasketItem showModal item={item} onDeleteItemFromBasket={props.onDeleteItemFromBasket}/>
        </div>
      )}
    </div>
  )
}

Basket.propTypes = {
  showModal:PropTypes.bool,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  onDeleteItemFromBasket: PropTypes.func,
};

Basket.defaultProps = {
  onDeleteItemFromBasket: () => {
  },
};

export default React.memo(Basket);