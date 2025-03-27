import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function ModalItem(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      // props.onSelect(props.item.code);
      // if (!props.item.selected) {
      setCount(count + 1);
      // }
    },
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div
      className={'Modal__Item' + (props.item.selected ? ' Modal__Item_selected' : '')}
      onClick={callbacks.onClick}
    >
      <div className="Modal__Item-code">{props.item.code}</div>
      <div className="Modal__Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Modal__Item-prise">
        <div>{count
          ? `${count} шт`
          : ''}</div>
        <div>{props.item.price} &#8381;</div>
      </div>
      <div className="Modal__Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}



ModalItem.propTypes = {
  ModalItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

ModalItem.defaultProps = {
  onDelete: () => { },
  onSelect: () => { },
};

export default React.memo(ModalItem);
