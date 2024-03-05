import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import List from '../list';
import { numberFormat } from '../../utils';
import './style.css';

/**
 * Модальное окно с корзиной покупок
 */
function Basket(props) {
  return (
    <Modal
      title='Корзина'
      onHide={props.onHideBasket}>
      {props.list.length > 0 
        ? <>
            <List list={props.list}
                  options={{showCount: true, isAppendable: false, isDeletable: true}}
                  onDeleteItem={props.onDeleteItem}/>
            <div className='Basket-footer'>
              <div>Итого</div>
              <div>{
                numberFormat(props.list.reduce((sum, current) => sum + current.price * current.count, 0)) }
              </div>
            </div>
          </>
        : <div className='Basket-empty'>В корзине пусто</div>
      }
    </Modal>
  )
}

Basket.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  hideBasket: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Basket.defaultProps = {
  onHideBasket: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Basket);