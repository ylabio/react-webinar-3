import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function ModalItem(props) {
  // Счётчик выделений
  // const [count, setCount] = useState(0);

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={'Modal__Item'} >
      <div className="Modal__Item-code">{props.item.code}</div>
      <div className="Modal__Item-title">
        <b>{props.item.title}</b>
      </div>
      <div className="Modal__Item-prise">
        <div>{props.item.count} шт </div>
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
};

ModalItem.defaultProps = {
  onDelete: () => { },
};

export default React.memo(ModalItem);
