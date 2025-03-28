import React from 'react';
import List from '../list';
import './style.css';
import PropTypes from "prop-types";

const Order = ({
                 orderList = [],
                 totalAmount = '0',
                 onRemove,
                 isModalOpen
}) => {
  return (
    <div className="Order">
      <h2 className={'Order-title'}>Корзина</h2>
      <List list={orderList} isModal={isModalOpen} onRemove={onRemove}/>
      <div className={'Order-priceBox'}>
        <p className={'Order-priceBox-title'}>Итого:</p>
        <p className={'Order-priceBox-value'}>{totalAmount}</p>
      </div>
    </div>
  )
}

Order.propTypes = {
  orderList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ),
  totalAmount: PropTypes.string,
  onRemove: PropTypes.func
};

export default React.memo(Order);
