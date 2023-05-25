import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    increaseCount: () => {
      props.increaseCount(props.item.code);
    },
    addItem: () => {
      props.addItem(props.item.code);
    },
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-actions'>
        <div>{props.item.price.toLocaleString()} ₽</div>
        <button onClick={callbacks.increaseCount}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  increaseCount: PropTypes.func,
  addItem: PropTypes.func,
};

Item.defaultProps = {
  increaseCount: () => {},
  addItem: () => {},
};

export default React.memo(Item);
