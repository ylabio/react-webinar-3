import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatter} from "../../utils";

function Item(props){

  const callbacks = {
    onChangeItemInCart: () => {
      props.onChangeItemInCart(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{`${formatter.format(props.item.price)}`}</div>
      <div className='Item-actions'>
        <button onClick={callbacks.onChangeItemInCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onChangeItemInCart: PropTypes.func
};

Item.defaultProps = {
  onChangeItemInCart: () => {}
}

export default React.memo(Item);
