import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Item from "../item";
import './style.css';

function List({list, onClick, isCart}) {
  const cn = bem("List");

  return (
    <div className={cn()}>{
      list.map((item, index) =>
        <div key={item.code} className={index === 0 ? cn("item-first") : cn("item")}>
          <Item item={item} onClick={onClick} isCart={isCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func,
  isCart: PropTypes.bool,
};

List.defaultProps = {
  onClick: () => {
  },
  isCart: false
}

export default React.memo(List);
