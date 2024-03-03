import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';
import Head from '../head';

/**
 * Модальное окно с корзиной покупок
 */
function Basket(props) {

  const overlayRef = useRef(null);  //  Ссылка на корневой DOM-элемент компонента
  const timer = 0;                  //  Таймер для эффекта fade-in

  //  Эффект fade-in
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

  // Скрытие модалки через эффект fade-out
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
        <Head title='Корзина'>
          <button className='action' onClick={onHideBasket}>
            Закрыть
          </button>
        </Head>
        <div className='Basket-body'>{
          props.basket.length > 0 
            ? <List list={props.basket}
                    options={{showCount: true, showTotals: true, isAppendable: false, isDeletable: true}}
                    onDeleteItem={props.onDeleteItem}/>
            : <div className='Basket-empty'>В корзине пусто</div>
          }
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