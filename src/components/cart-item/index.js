import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
function CartItem({ item = { code: 0, title: '', price: 0, count: 0 }, onDelete = () => {} }) {
  return (
    <>
      <h3 className="Item-title">{item.title}</h3>
      <p className="Item-count">{item.count} шт</p>
      <p className="Item-price">{item.price} ₽</p>
      <button type="button" className="Item-delete" onClick={() => onDelete(item.code)}>
        Удалить
      </button>
    </>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }),
  onDelete: PropTypes.func,
};
export default React.memo(CartItem);
