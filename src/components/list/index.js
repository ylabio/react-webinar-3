import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, onItemButtonClick, itemButtonCaption}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            onAddToCart={() => onItemButtonClick(item.code)}
            itemButtonCaption={itemButtonCaption}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onItemButtonClick: PropTypes.func.isRequired,
  itemButtonCaption: PropTypes.string.isRequired
};

export default React.memo(List);
