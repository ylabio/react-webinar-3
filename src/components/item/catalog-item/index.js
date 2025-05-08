import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CatalogItem({ item, onAdd }) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-actions">
        <span className="Item-price">{item.price.toLocaleString()} ₽</span>
        <button className="catalog" onClick={() => onAdd(item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default React.memo(CatalogItem);
