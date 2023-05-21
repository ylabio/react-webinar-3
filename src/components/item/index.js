import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item({item, onAddCartItem, onDeleteCartItem}) {
  
  const buttonTitle = onAddCartItem ? "Добавить" : "Удалить";
  
  const callbacks = {
    
    onAdd: () => {
      onAddCartItem(item);
    },

    onDelete: () => {
      onDeleteCartItem(item);
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-actions'>
        <p className='Item-actions__price'>{`${item.price.toLocaleString("ru")} ₽`}</p>
        {onDeleteCartItem && <p className='Item-actions__count'>{`${item.count} шт`}</p>}
        <button onClick={onAddCartItem ? callbacks.onAdd : callbacks.onDelete}>{buttonTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAddCartItem: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  onAddCartItem: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
};

Item.defaultProps = {
  onAddCartItem: null,
  onDeleteCartItem: null,
};

export default React.memo(Item);
