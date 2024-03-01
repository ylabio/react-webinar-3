import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

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
            ? <List list={props.basket}
                  options={{showCount: true, isAppendable: false, isDeletable: true}}
                  onDeleteItem={props.onDeleteItem}/>
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