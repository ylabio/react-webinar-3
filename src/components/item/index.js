import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import Button from "../button";
import './style.css';

function Item({item, forAdd}) {

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{`${item.price} ₽`}</div>
      <div className='Item-actions'>
        {/* callbacks.onDelete */}
        <Button style='Button_item' callback={forAdd} param={item.code}>
          Добавить
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
  forAdd: PropTypes.func.isRequired,
};

// Default values for properties:
Item.defaultProps = {
  forAdd: () => {},
}

export default React.memo(Item);
