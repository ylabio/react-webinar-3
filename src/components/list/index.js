import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function List({list, onAddToCart, onSelectItem}) {

  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} onAdd={onAddToCart} onSelect={onSelectItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddToCart: PropTypes.func,
  onSelectItem: PropTypes.func
};

List.defaultProps = {
  onAddToCart: () => {
  },
  onSelectItem: () => {
  },
}

export default React.memo(List);
