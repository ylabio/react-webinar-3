import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import './style.css'

function CartItem({ item, itemButtonsAction, itemButtonsName }) {

  return (
      <Item {...{ item, itemButtonsAction, itemButtonsName }}>
          <div className='Item-quantity'>
            {item.quantity} шт.
          </div>
      </Item>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  itemButtonsAction: PropTypes.func,
  itemButtonsName: PropTypes.string,
};

CartItem.defaultProps = {
  itemButtonsAction: () => {},
}

export default React.memo(CartItem);
