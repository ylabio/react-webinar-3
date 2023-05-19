import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const callbacks = {
    onAdd: (code) => {
      setCart(code)
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{props.item.price + '₽'}</div>
      <div className='Item-actions'>
        <button onClick={() => props.onAddItem(props.item.code, props.item.title, props.item.price)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
