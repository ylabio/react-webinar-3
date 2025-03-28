import React from 'react';
import './style.css';

function Item(props = { item: {} }) {
  return (
    <tr className={['Item', props.className].join(' ').trim()}>
      <td className="Item-title">
        <b>{props.item.title}</b>
      </td>
      <td className="Item-count">{props.item.count}</td>
      <td className="Item-price">{props.item.price} &#8381;</td>
      <td className="Item-actions">
        {props.controls}
      </td>
    </tr>
  );
}

export default React.memo(Item);
