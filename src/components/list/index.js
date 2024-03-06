import React from "react";
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from '../cart-item';
import './style.css';

function List({list, onClick, showAmount}) {

  return (
    <div className='List'>
      {
        list.map(item =>
          <div key={item.code} className='List-item'>
            { showAmount 
              ? <CartItem item={item} onClick={onClick} />
              : <Item item={item} onClick={onClick} />
            }
          </div>
        )
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array,
  onClick: PropTypes.func,
  showAmount: PropTypes.bool,
};

List.defaultProps = {
  onClick: () => {},
  showAmount: false
}

export default React.memo(List);
