import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import ItemBasket from "../itemBasket";
import './style.css';

function List({list, addToBasket = 0, deleteFromBasket = 0, itemType = "standartItem"}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {itemType === "basketItem" ? <ItemBasket item={item} onDelete={deleteFromBasket}/> : <Item item={item} addToBasket={addToBasket}/>}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  deleteFromBasket: PropTypes.func,
  addToBasket: PropTypes.func
};

List.defaultProps = {
  deleteFromBasket: () => {
  },
  addToBasket: () => {
  },
}

export default React.memo(List);
