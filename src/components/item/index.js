import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAdd = (e) => {}, onDelete = (e) => {} }) {

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();

      onDelete(item.code);
    },
    onAdd: e => {
      e.stopPropagation();

      onAdd(item.code);
    }
  };

  return (
    <div
      className="Item"
      onClick={callbacks.onClick}
    >
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-info">
        {item.count && (
          <div className="Item-count">
            {item.count} шт
          </div>
        )}
        <div className="Item-price">
          {item.price.toLocaleString('ru-RU')} &#8381;
        </div>
      </div>

      <div className="Item-actions">
        {
          item.count
            ? <button
                className='Item-actions--delete'
                onClick={callbacks.onDelete}
              >
                Удалить
              </button>
            : <button
                className='Item-actions--add'
                onClick={callbacks.onAdd}
              >
                Добавить
              </button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }),
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Item);
