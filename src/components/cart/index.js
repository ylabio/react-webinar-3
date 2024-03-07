import React from "react";
import PropTypes from 'prop-types';
import {formatPrice} from "../../utils";
import Modal from "../modal";
import List from "../list";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Cart({list, totalPrice, onClick, setOpenModal}) {
  const cn = bem('Cart');

  return (
    <Modal title="Корзина" setOpenModal={setOpenModal}>
      {totalPrice > 0
        ? <div className={cn('content')}>
            <div className={cn('list')}>
              <List list={list} onClick={onClick} textBtn='Удалить' />
            </div>
            <div className={cn('total')}>
              Итого <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        : <h1 className={cn('title')}>В корзине нет товаров</h1>
      }
    </Modal>
  )
}

Cart.propTypes = {
  list: PropTypes.array,
  totalPrice: PropTypes.number,
  onClick: PropTypes.func,
  setOpenModal: PropTypes.func
};
  
Cart.defaultProps = {
  onClick: () => {},
  setOpenModal: () => {}
}

export default React.memo(Cart);
