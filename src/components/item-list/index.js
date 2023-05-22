import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatter} from '../../utils';

function ItemList(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onClickItem(props.item.code);
    }
  }

  return (
    <div className={cn() + (props.item.selected ? ' Item_selected' : '')}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <p className={cn('price')}>{`${formatter(props.item.price)}`}</p>
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ItemList.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onClickItem: PropTypes.func,
};

ItemList.defaultProps = {
  onClickItem: () => { },
}

export default React.memo(ItemList);
