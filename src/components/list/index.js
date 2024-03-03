import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({list, onAddItemInCart}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddInCart={onAddItemInCart} buttonTitle='Добавить' active={false}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemInCart: PropTypes.func,
};

List.defaultProps = {
  onAddItemInCart: () => {
  }
}

export default React.memo(List);
