import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import CartItem from "../cart-item";

function List({ list, onClick, isForCart = false }){
  return (
    <div className={isForCart ? 'CartList' : 'List'}>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          { isForCart ? <CartItem item={item} onClick={onClick}/> : <Item item={item} onClick={onClick}/> }
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func
};

List.defaultProps = {
  onClick: () => {},
}

export default React.memo(List);
