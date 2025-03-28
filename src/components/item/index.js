import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {ItemButton} from '../itemButton'

function Item({
  item,
  onAddToCard = () => {}
}) {

  const callbacks = {
    onAddToCard: () => {
      onAddToCard(item.code)
    }
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
          <span>{item.price} ₽</span>
      </div>
      <ItemButton textButton='Добавить' onClick={callbacks.onAddToCard}/>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCard: PropTypes.func,
};

export default React.memo(Item);
