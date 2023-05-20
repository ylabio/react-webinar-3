import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import CartList from "../cartList";

function Cart({title, cartList, onDeleteItem}){
    const [display, setDisplay] = useState({display: 'block'});

    return (
      <div className='Cart' style={display}>
        <div className="Cart-head">
            <h1>{title}</h1>
            <div className="Cart-close">
                <button onClick={() => setDisplay({display: 'none'})}>Закрыть</button>
            </div>
        </div>
        <CartList cartList={cartList} onDelete={onDeleteItem}/>
      </div>
    )
  }
  
  Cart.propTypes = {
    title: PropTypes.node,
    cartList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
      })).isRequired,
    onDeleteItem: PropTypes.func,
  };

  Cart.defaultProps = {
    onDeleteItem: () => {},
  }
  
  export default React.memo(Cart);