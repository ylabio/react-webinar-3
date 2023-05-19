import React from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css';

function Item(props){
  const callbacks = {
    action: (e) => {
      e.stopPropagation();
      props.action({
        code: props.item.code,
        title: props.item.title,
        total: 1,
        price: props.item.price,
      });
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className="Item-price">{numberFormat(props.item.price)}</div>
      {props.item.total && (
        <div className="Item-count">{props.item.total} шт</div>
      )}
      <div className='Item-actions'>
        <button onClick={callbacks.action}>{props.buttonText}</button>
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
