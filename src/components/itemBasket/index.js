import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';
import {formatPrice } from "../../utils";

function ItemBusket(props) {

  let props2 = props.props2;

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item__info">
        <div className="Item-count-price">{`${formatPrice(props.item.price)} ₽`}&nbsp;&nbsp;&nbsp;&nbsp;{props.item.count ? props.item.count+' шт':''}</div>
      </div>
      <div className='Item-actions'>
        <button onClick={()=>{props2.onFunc(props.item)}}>
          {props2.button}
        </button>
      </div>
    </div>
  );
}

// Item.propTypes = {
//   item: PropTypes.shape({
//     code: PropTypes.number,
//     title: PropTypes.string,
//     selected: PropTypes.bool,
//     count: PropTypes.number
//   }).isRequired,
//   onDelete: PropTypes.func,
//   onSelect: PropTypes.func
// };

// Item.defaultProps = {
//   onDelete: () => {
//   },
//   onSelect: () => {
//   },
// }

export default React.memo(ItemBusket);
