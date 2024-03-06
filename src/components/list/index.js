import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import ListItem from "../list-item";

function List({list,  onAddItemToBasket}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <ListItem item={item} onAddItemToBasket={onAddItemToBasket}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,

  onAddItemToBasket: PropTypes.func,
};

List.defaultProps = {
  onAddItemToBasket: () => {
  },
};

export default React.memo(List);
