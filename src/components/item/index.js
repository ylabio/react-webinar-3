import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import Button from "../button";
import './style.css';

function Item({item, callback, target}) {

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{`${item.price} ₽`}</div>
      {target.name === "basket" && <div className='Item-tocart'>
        {`${item.tocart} шт`}</div>}
      <div className='Item-actions'>
        {/* callbacks.onDelete */}
        <Button style='Button_item' callback={callback} param={item.code}>
          {target.ctrl}
        </Button>
      </div>
    </div>
  );
}

// Typechecking with PropTypes:
Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  callback: PropTypes.func.isRequired,
  target: PropTypes.shape({
    name: PropTypes.string,
    ctrl: PropTypes.string
  }).isRequired,
};

// Default values for properties:
Item.defaultProps = {
  callback: () => {},
  target: { name: "main", ctrl: "Добавить"},
}

export default React.memo(Item);
