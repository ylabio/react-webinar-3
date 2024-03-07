import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

function List({ ItemComponent, data, onAddToCartItem, onDelete }) {

  return (
    <div className='List'>{
      data.map((item, id) =>
        <div key={item.code} className='List-item'>
          <ItemComponent
            item={item} 
            id={id + 1} 
            addToCart={onAddToCartItem}            
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  onAddToCartItem: PropTypes.func,
  onDelete: PropTypes.func,
};

List.defaultProps = {
  onAddToCartItem: () => {
  },
  onDelete: () => {
  },
}

export default React.memo(List);
