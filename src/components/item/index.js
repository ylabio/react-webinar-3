import React from 'react';
import PropTypes from 'prop-types';
import {formatCurrency} from '../../utils';
import './style.css';
import Controls from "../controls";


function Item({
                onAdd,
                onRemove,
                item,
                isModal = false
}) {
  const handleAdd = () => onAdd(item.code);
  const handleDel = () => onRemove(item.code);
  console.log('item')

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      {isModal
        && item.inOrder > 0
        && (
        <p className="Item-count">
          {item.inOrder} шт
        </p>
      )}
      <p className="Item-price">
        {formatCurrency(item.price)}
      </p>
      <div className="Item-actions">
        <Controls
          onClick={isModal ? handleDel : handleAdd}
          style={isModal ? 'remove' : 'add'}
          buttonText={isModal ? 'Удалить' : 'Добавить'}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    inOrder: PropTypes.number,
  }).isRequired,
  isModal: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
};
export default React.memo(Item);
