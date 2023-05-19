import React, {useState} from "react";
import PropTypes from "prop-types";
import {getNumberFormat, plural} from "../../utils";
import './style.css';

function Item(props){

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
      props.onGetCartInfo();
    },
    onClickAddToCart: (e) =>{
      e.stopPropagation();
      props.onAddToCart(props.item);
      props.onGetCartInfo();
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
      {
        props.item.count &&
          (
            <div className='Item-count'>
              {`${props.item.count} шт`}
            </div>
          )
      }
      <div className='Item-actions'>
        {
          props.item.count
          ?
          (
            <button onClick={callbacks.onDelete}>
              Удалить
            </button>
          )
          :
          (
            <button onClick={callbacks.onClickAddToCart}>
              Добавить
            </button>
          )
        }
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
  onDelete: PropTypes.func,
  onClickAddToCart: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {},
  onClickAddToCart: () => {},
}

export default React.memo(Item);
