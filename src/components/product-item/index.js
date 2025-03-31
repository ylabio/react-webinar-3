import React from 'react';
import PropTypes from 'prop-types';
import AddButton from '../add-button';
import './style.css';
import ItemTitle from '../item-title';
import ItemInfo from '../item-info';

function ProductItem({ item, onAddToCart }) {
  return (
    <div className="Item">
      <ItemTitle title={item.title} />
      <ItemInfo price={item.price}>
        <AddButton onClick={() => onAddToCart(item.code)} />
      </ItemInfo>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(ProductItem);
