import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { plural } from '../../utils';
// import { generateCode } from '../../utils.js';
import './style.css';

function Item({ item, onAdd }) {
  const callbacks = {
    onClick: () => {
      const newItem = {
        code: item.code,
        title: item.title,
        price: item.price,
        countAdd: 1,
      };
      onAdd(newItem);
    },
  };

  return (
    <div className='Item'>
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-prise">{item.price} &#8381;</div>
      <div className="Item-actions">
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => { },
};

export default React.memo(Item);
