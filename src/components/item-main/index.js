import React, {useState} from "react";
import PropTypes from "prop-types";
import {formatPrice, plural} from "../../utils";
import './style.css';

function ItemMain(props) {

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
    <div className='ItemMain'>
      <div className='ItemMain-code'>{props.item.code}</div>
        <div className='ItemMain-title'>
          {props.item.title}
        </div>
        <div className="ItemMain-price">
          {formatPrice(props.item.price)}
        </div>
      <div className='ItemMain-actions'>
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ItemMain.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func
};

ItemMain.defaultProps = {
  onAddItem: () => {
  },
};

export default React.memo(ItemMain);

//{props.item.price}&nbsp;₽