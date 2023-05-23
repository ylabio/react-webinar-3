import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const callbacks = {
    onClick: () =>  props.onClick(props.item)
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price.toLocaleString()}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
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
  onClick: PropTypes.func
};

Item.defaultProps = {
  onClick: () => {},
}

export default React.memo(Item);
