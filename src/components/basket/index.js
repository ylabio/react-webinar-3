import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketItem from './basket-item';

function Basket(props) {
  return (
    <div className='Basket'>
      <div className='Basket-frame'>
        <div className='Basket-head'>
          <h1>Корзина</h1>
          <div className='Basket-controls'>
            <button onClick={props.hideBasket}>Закрыть</button>
          </div>
        </div>
        <div className='Basket-body'>{
          props.basket.length > 0 
            ? props.basket.map(item =>
                  <div key={item.code} className='Basket-item'>
                    <BasketItem item={item} onDelete={props.onDeleteItem}/>
                  </div>
                )
            : <div className='Basket-empty'>В корзине пусто</div>}
        </div>
      </div>
    </div>
  )
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  })).isRequired,
  hideBasket: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Basket.defaultProps = {
  hideBasket: () => {},
  onDeleteItem: () => {}
}

export default Basket;