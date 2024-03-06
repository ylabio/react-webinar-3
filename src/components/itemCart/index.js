import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ItemCart(props) {

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
      {`${props.item.price.toLocaleString()} ₽`}
      </div>
      <div className={'Item-count'}>
      {`${props.item.amountCart} шт`}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          Удалить
        </button>
      </div>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func,
};

// ItemCart.defaultProps = {
//   onDelete: () => {
//   },
//   onSelect: () => {
//   },
// }

export default React.memo(ItemCart);