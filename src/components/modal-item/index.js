import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatNumber } from '../../utils'
function ModalItem({ item, onDelete = () => { } }) {
  const callbacks = {
    onDelete: () => {
      onDelete(item.code);
    },
  };

  return (
    <div className={'ModalItem'} >
      <div className="ModalItem-title">
        <b>{item.title}</b>
      </div>
      <div className="ModalItem-prise">
        <div>{item.count} шт</div>
        <div>{formatNumber(item.price)} ₽</div>
      </div>
      <div className="ModalItem-actions">
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
