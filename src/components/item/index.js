import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddToCart}>
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
  onAddToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddToCart: () => {},
}

export default React.memo(Item);
