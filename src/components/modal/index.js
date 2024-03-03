import React from "react";
import List from "../list";
import Head from "../head";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({cart, totalAmount, toggleModal, onAction}) {
  const cn = bem('Modal');
  const handleCloseModal = (event) => {
    if (!event.target.closest('.Modal-content')) {
      toggleModal();
    }
  };
  
  return (
    <div className={cn()}>
    <div className={cn('overlay')} onClick={handleCloseModal}/>
    <div className={cn('content')}>
      <div className={cn('header')}>
        <Head title='Корзина' btnText='Закрыть' btnAction={toggleModal}/>
      </div>
        <List list={cart} onAction={onAction} actionText={'Удалить'}/>
        <div className={cn('total')}>
          <span>Итого</span>
          <span>{totalAmount} ₽</span>
        </div>
    </div>
    </div>
  )
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAction: PropTypes.func,
  toggleModal: PropTypes.func.isRequired,
  totalAmount: PropTypes.number,
};

Modal.defaultProps = {
  onAction: () => {
  },
  toggleModal: () => {
  },
}

export default React.memo(Modal);
