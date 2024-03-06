import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: () => {
      props.onAdd(props.item);

    }
  }

  return (
    <div className={'Item'}>
      <div style={{display: 'flex'}}><div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}  
      </div>
      </div>
      <div style={{display: 'flex'}}>
      <div className='Item-price'>
      {`${props.item.price} ₽`}
      </div>
      <div className={props.item.amountCart > 0 ? 'Item-count' : 'Item-disable'}>
      {`${props.item.amountCart} шт`}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          {props.text}
        </button>
      </div>
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
  onClick: PropTypes.func,
  text: PropTypes.string
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
