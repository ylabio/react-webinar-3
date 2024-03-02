import React from "react";
import Button from "../button/index";
import ItemInfo from "../item-info/index";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const callbacks = {
    onAddOrRemoveToCart: (e) => {
      e.stopPropagation();
      props.callback(props.item);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <ItemInfo type={props.type} price={props.item.price} count={props.item.countInCart}/>
      <Button callback={callbacks.onAddOrRemoveToCart}  title={props.buttonTitle}/>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  callback: PropTypes.func,
};

Item.defaultProps = {
  callback: () => {
  },
}

export default React.memo(Item);
