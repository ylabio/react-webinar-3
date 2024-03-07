import React, {useState} from "react";
import PropTypes from "prop-types";
import {formatPrice, plural} from "../../utils";
import './style.css';

function Item(props) {

  console.log("item" + props.item.code + props.item.count)

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItem(props.item.code);
    },
    onAdd: (e) => {
      props.onAddItem(props.item.code);
    }
  }

  return (
    <div className='Item'>
      {props.show.includes('code') && <div className='Item-code'>{props.item.code}</div>}
      {
        props.show.includes('title') &&
          <div className='Item-title'>
            {props.item.title}
          </div>
      }
      {
        props.show.includes('price') &&
          <div className="Item-price">
            {formatPrice(props.item.price)}
          </div>
      }
      {
        props.show.includes('count') &&
          <div className="Item-count">
            {props.item.count}&nbsp;шт
          </div>
      }
      <div className='Item-actions'>
        {
          props.show.includes('add') &&
            <button onClick={callbacks.onAdd}>
              Добавить
            </button>
        }
        {
          props.show.includes('delete') &&
            <button onClick={callbacks.onDelete}>
              Удалить
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
    price: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

Item.defaultProps = {
  onDeleteItem: () => {
  },
  onSelectItem: () => {
  },
};

export default React.memo(Item);

//{props.item.price}&nbsp;₽