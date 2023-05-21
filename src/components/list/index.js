import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({list, onAddCartItem, onDeleteCartItem}) {
  return (
    <div className='List'>
      {list.length > 0 ? list.map(item => (
        <div key={item.code} className='List-item'>
          <Item item={item} onAddCartItem={onAddCartItem} onDeleteCartItem={onDeleteCartItem} />
        </div>
      )) : <div className='List-item-empty'>Пусто</div>}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddCartItem: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  onDeleteCartItem: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
};

List.defaultProps = {
  onAddCartItem: null,
  onDeleteCartItem: null,
};

export default React.memo(List);
