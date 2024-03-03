import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Head from "../head";
import Item from "../item";


function Basket(props) {

  return (
    <div className='Basket'>
      <div className='Basket-layout'>
        <div className='Basket-head'>
          <Head title={'Корзина'}/>
          <button onClick={() => props.setShowModal(false)}>Закрыть</button>
        </div>
        <div className='Basket-items'>
          {props.basket.items.map((el) => (
            <Item onDeleteItemFromBasket={props.onDeleteItemFromBasket} showModal={props.showModal} item={el}/>))}
        </div>
        <div className='Basket-item-total-price'><div>Итого: </div><div>{props.basket.totalPrice} ₽</div></div>
      </div>
    </div>
  )
}

Basket.propTypes = {
  basket: PropTypes.array,
  showModal: PropTypes.bool,
  onDeleteItemFromBasket: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default React.memo(Basket);