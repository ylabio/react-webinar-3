import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(0);

  
  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} {count ? ` | Выделяли ${count} ${plural(count, {
        one: 'раз',
        few: 'раза',
        many: 'раз'
      })}` : ''}
      </div>
      <div className="Item__info">
        {
          props.item.count ? <div className="Item-count-price">{props.item.price}{' ₽'}&nbsp;&nbsp;&nbsp;&nbsp;{props.item.count}{' шт'}</div> : ''
        }
      </div>
      <div className='Item-actions'>
        <button onClick={()=>{props.onFunc(props.item)}}>
          {props.button}
        </button>
      </div>
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
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
