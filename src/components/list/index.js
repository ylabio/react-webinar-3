import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import ItemCart from '../item-cart';

function List({list, onChangeItemInCart, isModalActive}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {isModalActive ?
            <ItemCart item={item} onDeleteInCart={onChangeItemInCart}/> :
            <Item item={item} onAddInCart={onChangeItemInCart}/>
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
  onChangeItemInCart: PropTypes.func,
};

List.defaultProps = {
  onChangeItemInCart: () => {
  }
}

export default React.memo(List);
