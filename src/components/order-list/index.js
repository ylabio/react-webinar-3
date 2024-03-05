import React from "react";
import PropTypes from 'prop-types';
import OrderItem from "../order-item";
import './style.css';

function OrderList({list, onClick}) {

  return (
    <div className='OrderList'>{
      list.map(item =>
        <div key={item.code} className='OrderList-item'>
          <OrderItem item={item} onClick={onClick}/>
        </div>
      )}
    </div>
  )
}

OrderList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func,
};

OrderList.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(OrderList);
