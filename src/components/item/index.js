import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onAddToCart: () => {
      props.onAddToCart(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className="Item-price">
          <div >{props.item.price.toLocaleString('ru-RU')} ₽</div>
        </div>

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
    count: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func
};

Item.defaultProps = {
  onAddToCart: () => { },
}

export default React.memo(Item);
