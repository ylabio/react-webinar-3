import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props){
  const callbacks = {
    handleClick: () => {
      props.handleClick(props.item.code)
    }
    /* onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }, */
  }
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-price">
        {props.item.price}&nbsp;&#8381;
      </div>
      {props.buttonName === 'Удалить' ? <div className="Item-count">
          {props.item.count}&nbsp;шт.
      </div> : ''}  
      <div className='Item-actions'>
        <button className='Item-button' onClick={callbacks.handleClick}>
          {props.buttonName}
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
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  handleClick: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
  handleClick: () => {},
}

export default React.memo(Item);
