import React, { } from "react";
import PropTypes from "prop-types";
import PageLayout from '../page-layout';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";
import OrderItem from "../order-item";
import List from "../list";

function OrderDetails({ basket, onDeleteItem, onClosePopUp }) {

  const cn = bem('OrderDetails');

  const renderOrderItem = (item) => (<OrderItem item={item} onClick={onDeleteItem}/>)

  return (
    <PageLayout size={'s'}>
      <div className={cn()}>
        <h1 className={cn('header')}>Корзина</h1>
        <div className={cn('box')}>
          <button className={cn('btn')} onClick={onClosePopUp}>Закрыть</button>
        </div>
      </div>
      <List list={basket.list} renderItem={renderOrderItem}/>
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
