import React from "react";
import PropTypes from "prop-types";
import { formatSum } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className='Item-price'>
        {formatSum(props.item.price, { style: 'currency', currency: 'RUB' })}
      </div>
      {
        props.item.amount ? 
          <div className='Item-amount'>
            {`${props.item.amount} шт`}
          </div>
        : <></>
      }
      <div className='Item-actions'>
          <button className='Item-button' onClick={callbacks.onClick}>
            {props.buttonText}
          </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    amount: PropTypes.number
  }),
  onDelete: PropTypes.func,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAdd: () => {
  },
}

export default React.memo(Item);
