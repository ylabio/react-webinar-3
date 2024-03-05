import React from "react";
import PropTypes, { number } from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Item from "../item";
import './style.css';

function List({list, addItem, removeItems, basketCounter}) {

  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => 
        <div key={item.code} className={cn('item')}>
          <Item item={item} addItem={addItem} basketCounter={basketCounter} removeItems={removeItems} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  addItem: PropTypes.func,
  removeItems: PropTypes.func,
  basketCounter: PropTypes.objectOf(number)
};

List.defaultProps = {
  list: [
    {code: 1}
  ]
}

export default React.memo(List);
