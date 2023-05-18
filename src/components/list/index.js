import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list,
                cartItems,
                store,
                showAddButton=false,
                showDeleteButton=false,
                showCount=false}){

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item}
                cartItems={cartItems}
                showAddButton={showAddButton}
                showDeleteButton={showDeleteButton}
                showCount={showCount}
                store={store} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default React.memo(List);
