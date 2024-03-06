import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, onAddToCart, onDeleteItem, showModal }) {
  const cn = bem('List')

  return (
    <div className={cn()}>
      {list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item showModal={showModal} item={item} onAddToCart={onAddToCart} onDeleteItem={onDeleteItem}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  showModal: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(List);
