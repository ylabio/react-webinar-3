import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';
import { numberWithSpaces } from "../../utils";

function Item(props) {

  const callbacks = {
    action: () => {
      props.action(props.item.code);
    }
  }

  return (
    <div className='Item'
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {`${numberWithSpaces(props.item.price)} ₽`}
      </div>
      {props.isModal ? 
      <div className='Item-count'>
        {`${numberWithSpaces(props.item.count)} шт`}
      </div>
      : null}
      <div className='Item-actions'>
        <Button onClickFunc={() => callbacks.action()} text={props.buttonText}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  action: PropTypes.func,
  buttonText: PropTypes.string
};

Item.defaultProps = {
  action: () => {
  },
  buttonText: ''
}

export default React.memo(Item);
