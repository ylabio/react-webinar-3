import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import itemCatalog from "../itemCatalog/itemCatalog";
import itemCart from "../itemCart/itemCart";

function List({ list, onAction, buttonText }) {
  const ItemComponent = buttonText === 'Добавить' ? itemCatalog : itemCart;

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <ItemComponent item={item} onAction={onAction} buttonText={buttonText} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};

export default React.memo(List);
