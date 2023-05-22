import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formattedPrice} from "../../utils";

function Item(props) {

  const callbacks = {
    itemFunction: (e) => {
      e.stopPropagation();
      props.itemFunction(props.item.code)
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className="Item-price">{formattedPrice(props.item.price)}</div>
      {props.item.count && (
        <div className="Item-count">{(props.item.count)} шт</div>
      )}
      <div className='Item-actions'>
        <button onClick={callbacks.itemFunction}>{props.itemTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  itemFunction: PropTypes.func,
  itemTitle: PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {
  },
}

export default React.memo(Item);
