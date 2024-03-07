import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item.code);
    },
    onDelete: () => {
      props.onDelete(props.item.code);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className="Item-price">{props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ₽'}</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAdd}>Добавить</button>
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
  onAdd: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
