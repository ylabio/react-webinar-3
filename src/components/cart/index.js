import React  from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import {formatter} from "../../utils";
import CartItem from "../cart-item";

function Cart(props){

  return (
    <>
      <Head title='Корзина'
            closeButton={true}
            handleClick={props.handleClick}
      />
      <Controls fullClear ={true}/>
      <List list={props.list}
            onChangeItemInCart={props.onChangeItemInCart}
      >
        <CartItem/>
      </List>
      <div className='Cart-totalPrice'>
        <span className='Cart-totalPrice-label'>Итого</span>
        <span className='Cart-totalPrice-value'>{formatter.format(props.totalPrice)}</span>
      </div>
    </>
  )
}

Cart.propTypes = {
  cartList: PropTypes.array,
  totalPrice: PropTypes.number,
  handleClick: PropTypes.func,
  onChangeItemInCart: PropTypes.func
};

Cart.defaultProps = {
  cartList: [],
  totalPrice: 0,
  handleClick: () => {},
  onChangeItemInCart: () => {}
}

export default React.memo(Cart);
