import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {numberWithSpaces} from "../../utils";
import Product from "../product";

const Cart = ({onDeleteCart, store, cartList}) => {
    return ( 
        <>
            <div className="Cart-main">
                {cartList.length === 0 && <div className="Cart-desc"><b>Корзина пуста</b></div>}
                {cartList.map(item => 
                    <Product key={item.code} item={item} onDelete={onDeleteCart} />
                )}
            </div>
            {cartList.length > 0 && 
                <div className="Cart-footer">
                    <div className="Cart-total">
                        <b>Итого</b>
                    </div>
                    <div className="Cart-price">
                        <b>{numberWithSpaces(store.cartPrice(cartList))} ₽</b>
                    </div>
                </div>
            }
        </>
    );
}

Cart.propTypes = {
    onDeleteCart: PropTypes.func,
    onCartPrice: PropTypes.number,
    cartList: PropTypes.arrayOf(PropTypes.object).isRequired
};
  
Cart.defaultProps = {
    onDeleteCart: () => {}
}
 
export default React.memo(Cart);