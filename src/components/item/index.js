import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props){

  // Счётчик выделений
  /* const [count, setCount] = useState(0); */

  const callbacks = {
    /* onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, */
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    }
  }

  console.log(props.flag)

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         /* onClick={callbacks.onClick} */>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} {/* {count ? ` | Выделяли ${count} ${plural(count, {one: 'раз', few: 'раза', many: 'раз'})}` : ''} */}
        <div className="Item-price">
          {props.item.price.toLocaleString()} ₽
          {props.flag && <div className="Item-amount">{props.item.count.toLocaleString()} шт</div>}
        </div>
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAdd}>
          {props.flag ? 'Удалить' : 'Добавить'}
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
  onAdd: PropTypes.func,
  /* onSelect: PropTypes.func */
};

Item.defaultProps = {
  onAdd: () => {},
  /* onSelect: () => {}, */
}

export default React.memo(Item);
