import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalItem({ item, onDelete = () => { } }) {
  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDelete(item.code);
    },
  };

  return (
    <div className={'Modal__Item'} >
      <div className="Modal__Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Modal__Item-prise">
        <div>{item.count} шт</div>
        <div>{item.price} &#8381;</div>
      </div>
      <div className="Modal__Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ModalItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(ModalItem);
