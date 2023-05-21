import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import ItemCart from '../cart-item';
import './style.css';

function List({list, onClickItem, type}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {type !== 'cart' ?
            <Item item={item} onAddToCart={onClickItem}/>
            :
            <ItemCart item={item} onDeleteFromCart={onClickItem}/>
          }
          
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClickItem: PropTypes.func
};

List.defaultProps = {
  onClickItem: () => {},
}

export default React.memo(List);
