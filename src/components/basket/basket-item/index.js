import React from "react";
import PropTypes from "prop-types";
import {formatCurrency} from "../../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onDelete: () => {
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-part Item-part-left'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>
          {props.item.title}
        </div>
      </div>
      <div className='Item-part Item-part-right'>
        <div className='Item-price'>
          {formatCurrency(props.item.price)}
        </div>
        <div className='Item-count'>
          {props.item.count + " шт"}
        </div>
        <div className='Item-actions'>
          <button onClick={callbacks.onDelete}>
            Удалить
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
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
}

export default React.memo(Item);
