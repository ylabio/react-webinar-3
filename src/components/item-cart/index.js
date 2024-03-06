import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemCart({item, onDeleteInCart}) {

  const [, setItemDeleted] = useState(false);

  const callbacks = {
    onDeleteInCart: () => {
      onDeleteInCart(item.code);
      setItemDeleted(true);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{item.price.toLocaleString()} ₽</div>
      <div className='Item-count'>{item.count} шт</div>
      <div className='Item-actions'>
        <button onClick={callbacks.onDeleteInCart}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDeleteInCart: PropTypes.func,
};

ItemCart.defaultProps = {
  onDeleteInCart: () => {
  }
}

export default React.memo(ItemCart);
