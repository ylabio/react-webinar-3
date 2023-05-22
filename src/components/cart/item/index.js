import PropTypes from "prop-types";
import React from "react";
import './style.css'
import '../../item/style.css';
import { toLocaleCurrency } from "../../../utils";

function CartItem(props) {
  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className="Item-price">{toLocaleCurrency(props.item.price)}</div>
      <div className="Item-amount">{props.item.amount}&nbsp;шт</div>
      <div className='Item-actions' onClick={() => props.handleDelete(props.item.code)}>
        <button>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  handleDelete: PropTypes.func
};

CartItem.defaultProps = {
  handleDelete: () => { }
}

export default React.memo(CartItem);
