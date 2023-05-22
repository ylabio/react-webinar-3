import React from "react";
import Head from "../../components/head";
import List from "../../components/list";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart(props) {

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title='Корзина' setShowModal={props.setShowModal}
          showModal={props.showModal} />
        <List list={props.cart} isCart={true} onDeleteItem={props.onDeleteItem} />
        <div className={cn('total')}>
          Итого <span>{props.totalPrice.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
  setShowModal: () => {},
  onDeleteItem: () => {}
}

export default React.memo(Cart);
