import PropTypes from "prop-types";
import React from "react";
import { formatCart } from '../../utils';
import './style.css';

function Cart(props) {
  return (
    <div className='Cart'>
      <div>В корзине:</div>
      <div className="Cart-info">{formatCart(props.info)}</div>
      <button onClick={props.openModal}>Перейти</button>
    </div>
  )
}

Cart.propTypes = {
  info: PropTypes.shape({
    total: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
  }),
  openModal: PropTypes.func
}

Cart.defaultProps = {
  openModal: () => { }
}

export default React.memo(Cart);
