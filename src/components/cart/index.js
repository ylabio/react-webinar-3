import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Modal from '../modal';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Cart(props) {

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <Modal title={'Корзина'} toggleModal={props.toggleModal}>
        <List list={props.cartList} onDeleteItem={props.onDeleteItem} isCartList={true} isList={false}/>
        <div className={cn('sum')}><span>Итого</span>{props.pricesSum + '\u00A0₽'}</div>
      </Modal>
    </div>
  )
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  pricesSum: PropTypes.string,
  onDeleteItem: PropTypes.func,
  toggleModal: PropTypes.func
};

Cart.defaultProps = {
  onDeleteItem: () => {
  },
  toggleModal: () => {
  }
}

export default React.memo(Cart);