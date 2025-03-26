import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {
  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title"><b>{props.item.title}</b></div>
      <div>{props.item.price} ₽</div>
      <div className="Item-actions">
        <button onClick={ () => {} }>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired
};

export default React.memo(Item);
