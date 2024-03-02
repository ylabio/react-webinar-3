import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

/**
 * Модальное окно с корзиной покупок
 */
function Basket(props) {

  const overlayRef = useRef(null);
  const timer = 0;

  useEffect(
    () => {
      if (overlayRef.current) {
        setTimeout(
          () => overlayRef.current.classList.remove("modal-invisible"),
          0
        );
      }
      return () => clearTimeout(timer)
    },
    []
  );

  const onHideBasket = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add("modal-invisible");
      setTimeout(
        () => props.hideBasket(),
        200
      )
    } else {
      props.hideBasket();
    }
  }

  return (
    <div className='Basket modal modal-invisible' ref={overlayRef}>
      <div className='Basket-frame'>
        <div className='Basket-head'>
          <h1>Корзина</h1>
          <div className='Basket-controls'>
            <button onClick={onHideBasket}>Закрыть</button>
          </div>
        </div>
        <div className='Basket-body'>{
          props.basket.length > 0 
            ? <List list={props.basket}
                    options={{showCount: true, showTotals: true, isAppendable: false, isDeletable: true}}
                    onDeleteItem={props.onDeleteItem}/>
            : <div className='Basket-empty'>В корзине пусто</div>}
        </div>
      </div>
    </div>
  )
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
  hideBasket: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Basket.defaultProps = {
  hideBasket: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Basket);