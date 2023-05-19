import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, cartItems, setCartItems }){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
            <Item item={item}
                cartItems={cartItems}
                setCartItems={setCartItems} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

export default React.memo(List);
