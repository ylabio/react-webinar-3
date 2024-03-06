import React, { } from "react";
import PropTypes from "prop-types";
import PageLayout from '../page-layout';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";
import OrderList from "../order-list";

function OrderDetails({ basket, onDeleteItem, onClosePopUp }) {

  const cn = bem('OrderDetails');

  return (
    <PageLayout size={'s'}>
      <div className={cn()}>
        <h1 className={cn('header')}>Корзина</h1>
        <div className={cn('box')}>
          <button className={cn('btn')} onClick={onClosePopUp}>Закрыть</button>
        </div>
      </div>
      <OrderList list={basket.list} onClick={onDeleteItem}/>
      <b>
        <div className={cn('price')}>
          <div>Итого</div>
          <div className={cn('count')}>{numberFormat(basket.totalPrice)}</div>
        </div>
      </b>
    </PageLayout>
  );
}

OrderDetails.propTypes = {
  basket: PropTypes.shape({
    list: PropTypes.array.isRequired,
    totalPrice: PropTypes.number.isRequired
  }).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onClosePopUp: PropTypes.func.isRequired
};

OrderDetails.defaultProps = {
  onDeleteItem: () => {
  },
  onClosePopUp: () => {
  },
}

export default OrderDetails;
