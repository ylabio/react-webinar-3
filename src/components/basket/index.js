import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import List from '../list';
import Head from '../head';
import './style.css';

/**
 * Модальное окно с корзиной покупок
 */
function Basket(props) {
  return (
    <Modal>
      <Head title='Корзина'>
        <button className='action' onClick={props.onHideBasket}>
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
    </Modal>
  )
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object).isRequired,
  hideBasket: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Basket.defaultProps = {
  onHideBasket: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Basket);