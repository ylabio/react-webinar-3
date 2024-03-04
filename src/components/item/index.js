import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { pluralCurrencies } from '../../utils'

function Item(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAddItem: (e) => {
      e.stopPropagation();
      props.onAddItem(props.item)
    }
  }

  if (!props.item.code) {
    return;
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <p className={'Item-actions__price'}>{pluralCurrencies(props.item.price)}</p>
        {props.buttonText === 'Удалить' && (<p className={'Item-actions__count'}>{props.item.count} шт</p>)}
        <button onClick={props.buttonText === 'Удалить' ? callbacks.onDelete : callbacks.onAddItem}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onAddItem: PropTypes.func,
  buttonText: PropTypes.string
};

Item.defaultProps = {
  onDelete: () => {
  },
  onAddItem: () => {
  },
}

export default React.memo(Item);
