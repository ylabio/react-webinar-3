import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({
  list = [],
  modal = false,
  formatPrice,
  onAddProductToBasket = () => {},
  onDeleteProduct = () => {},
}) {
  console.log(list);

  return (
    <ul className="List">
      <div className="container">
        {list.map(item => (
          <li key={item.code} className="List-item">
            <Item
              item={item}
              modal={modal}
              onAddProductToBasket={onAddProductToBasket}
              onDeleteProduct={onDeleteProduct}
              formatPrice={formatPrice}
            />
          </li>
        ))}
      </div>
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ),
  modal: PropTypes.bool,
  formatPrice: PropTypes.func.isRequired,
  onAddProductToBasket: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default React.memo(List);
