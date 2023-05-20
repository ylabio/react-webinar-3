import React from "react";
import PropTypes from "prop-types";
import {getNumberFormat} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
    onClickAddToCart: (e) =>{
      e.stopPropagation();
      props.onAddToCart(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
          {`${getNumberFormat(props.item.price)}`}&nbsp;₽
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClickAddToCart}>
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
    price: PropTypes.number
  }).isRequired,
  onClickAddToCart: PropTypes.func
};

Item.defaultProps = {
  onClickAddToCart: () => {},
}

export default React.memo(Item);
