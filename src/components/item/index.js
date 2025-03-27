import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item = {}, handler = () => { }, nameButton = '', classActionButton = '' }) {
  const callbacks = {
    handler: e => {
      e.stopPropagation();
      handler(item.code);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className='Item-container'>
        {item.count && <div className='Item-count'>{item.count} шт</div>}
        <div className='Item-price'>{item.price.toLocaleString()} ₽</div>
        <div className="Item-actions">
          <button className={classActionButton} onClick={callbacks.handler}>
            {nameButton}
          </button>
        </div>
      </div>

    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  handler: PropTypes.func,
  nameButton: PropTypes.string,
  classActionButton: PropTypes.string,
};

export default React.memo(Item);
