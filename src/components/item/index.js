import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
    onAdd: () => {
      props.onAdd(props.item.code);
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);

    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
          <div className='Item-price'>
              {props.item.price} ₽
          </div>
      <div className='Item-actions'>
              <button onClick={(e) => {
                  e.stopPropagation();
                  props.onСlickItem(props.item.code);
                  console.log(props);
              }}>
                  {props.title}
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
    onClickItem: PropTypes.func.isRequired
};

Item.defaultProps = {
    onClickItem: () => { }
}

export default React.memo(Item);
