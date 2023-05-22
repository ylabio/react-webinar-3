import React from "react";
import PropTypes from "prop-types";
import {convertPrice} from "../../utils";
import './style.css';
import PrimaryButton from "../primary-button";

function CartItem({ item, onClick }){
  return (
    <div className={'CartItem'}>
      <div className='CartItem-code'>{item.code}</div>
      <div className='CartItem-title'>
        {item.title}
      </div>
      <div className={'CartItem-info'}>
        <div className={'CartItem-price'}>
          {convertPrice(item.price)}
        </div>
        <div>
          {item.count} шт
        </div>
      </div>
      <div className='CartItem-actions'>
        <PrimaryButton description={'Удалить'} onClick={() => onClick(item.code)}/>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

CartItem.defaultProps = {
  onClick: () => {},
}

export default React.memo(CartItem);
