import React from "react";
import PropTypes from "prop-types";
import {RUR} from '../../constants/currency-signs';
import { formatPrice } from '../../utils';
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {`${formatPrice(props.item.price)} ${RUR}`}
      </div>
      {props.item.amount && <div className='Item-amount'>
        {props.item.amount} шт
      </div>}
      <div className='Item-actions'>
        <button className='Item-actions-button' onClick={callbacks.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

Item.defaultProps = {
  buttonText: 'Нажать',
  onClick: () => {
  }
}

export default React.memo(Item);
