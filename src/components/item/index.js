import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({item, onAddInCart, buttonTitle, active, onDeleteInCart}) {

  // Счётчик товара в корзине
  const [count, setCount] = useState(0);

  const callbacks = {
    onAddInCart: () => {
      setCount(count + 1);
      item.count += 1;
      onAddInCart(item.code);
    },

    onDeleteInCart: () => {
      onDeleteInCart(item.code);
      setCount(0);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{item.price.toLocaleString()} ₽</div>
      {active && <div className='Item-count'>{item.count} шт</div>}
      <div className='Item-actions'>
        <button onClick={active ? callbacks.onDeleteInCart : callbacks.onAddInCart}>
          {buttonTitle}
        </button>
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
  buttonTitle: PropTypes.string,
  onAddInCart: PropTypes.func,
  onDeleteInCart: PropTypes.func,
  active: PropTypes.bool
};

Item.defaultProps = {
  onAddInCart: () => {
  },
  onDeleteInCart: () => {
  },
  active: false
}

export default React.memo(Item);
