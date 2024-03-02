import React, {useState} from "react";
import Button from "../button/index";
import ItemInfo from "../item-info/index";
import PropTypes from "prop-types";
// import {plural} from "../../utils";
import './style.css';

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(1);

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    // onDelete: (e) => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code);
    // },

    onAddOrRemoveToCart: (e) => {
      e.stopPropagation();
      // props.onAddToCart(props.item);
      props.callback(props.item);
      // if(props.type === 'Shop') {
      //   setCount(count + 1);
      //   console.log('count', count );
      // }else{
      //   setCount(0);
      // }
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
        {/* {count ? ` | Выделяли ${count} ${plural(count, {
        one: 'раз',
        few: 'раза',
        many: 'раз'
      })}` : ''} */}
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
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  callback: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  callback: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
