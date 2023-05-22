import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function List({list, onClick, btnTitle}){
  const cn = bem('List')

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} onClick={onClick} btnTitle={btnTitle}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItemToCart: PropTypes.func,
};

List.defaultProps = {
  onAddItemToCart: () => {},
}

export default React.memo(List);
