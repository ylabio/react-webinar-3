import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import { ITEM_ACTIONS } from "../../constants/actions";

function List({list, action, onItemButtonClick}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} action={action} onButtonClick={onItemButtonClick} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  action: PropTypes.oneOf([ITEM_ACTIONS.ADD_TO_CART, ITEM_ACTIONS.REMOVE_FROM_CART]).isRequired,
  onItemButtonClick: PropTypes.func
};

List.defaultProps = {
  onItemButtonClick: () => {}
}

export default React.memo(List);
