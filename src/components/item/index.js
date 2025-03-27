import React, { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';

const Item = ({ item, onAddItem }) => {
  return (
    <div className='Item'>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</div>
      <div className="Item-actions">
        <button
          className="Add-button"
          onClick={e => {
            e.stopPropagation();
            onAddItem(item.code); 
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default memo(Item);
