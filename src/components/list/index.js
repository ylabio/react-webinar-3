import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, onAddToCart, onDeleteItem, hideCart }) {
  const cn = bem('List')

  return (
    <div className={cn()}>
      {hideCart ?
          <>
            {list.map(item =>
              <div key={item.code} className={cn('item')}>
                <Item hideCart={hideCart} item={item} onAddToCart={onAddToCart} text="Добавить"/>
              </div>
            )}
          </>
        :
        <>
          {list.map(item =>
          <div key={item.code} className={cn('item')}>
            <Item hideCart={hideCart} item={item} onDeleteItem={onDeleteItem}  text="Удалить"/>
          </div>)}
        </>
     }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  hideCart: PropTypes.bool,
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
