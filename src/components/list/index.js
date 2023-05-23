import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, buttonClickAction, buttonName,isCartItem = false, totalPrice = 0}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} 
		    buttonClickAction={buttonClickAction} 
		    buttonName={buttonName}
			isCartItem={isCartItem}
		  />
        </div>
      )}
	  {isCartItem && <div className='List-total'><span className='mr-70'>Итого</span> {`${totalPrice.toLocaleString()}  ₽`}</div>}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  buttonClickAction: PropTypes.func,
  buttonName:PropTypes.string
};

List.defaultProps = {
	buttonClickAction: () => {},
}

export default React.memo(List);
