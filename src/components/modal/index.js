import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberWithSpaces } from "../../utils";
import List from "../list";
import Head from "../head";
import './style.css';

function Modal({ cart, cartSum, modal, setModalState, onItemClick }) {

  const cn = bem('Modal');

  return (
    <div className={cn({ opened: modal })}>
      <div className={cn('wrapper')}>
        <Head title='Корзина' setModalState={setModalState}>
          <button onClick={() => setModalState(false)}>Закрыть</button>
        </Head>
        <List list={cart} text={'Удалить'} onItemClick={onItemClick} />
        {cart.length > 0 &&
          <div className={cn('footer')}>
            <b>Итого </b><b>{numberWithSpaces(cartSum)} ₽</b>
          </div>
        }
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number
  })).isRequired,
  cartSum: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  onItemClick: PropTypes.func
};

Modal.defaultProps = {
  onItemClick: () => {

  },
}

export default Modal;
