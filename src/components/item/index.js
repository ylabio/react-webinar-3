import React from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import Button from "../button";
import './style.css';

/* COMPONENTS TODO:
component item:
 - component button */

function Item(props) {

/*   const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);

    }
  } */

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{`${props.item.price} ₽`}</div>
      <div className='Item-actions'>
        {/* callbacks.onDelete */}
        <Button style='Button_item' callback={() => null}>
          Добавить
        </Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
};

/* Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
} */

export default React.memo(Item);
