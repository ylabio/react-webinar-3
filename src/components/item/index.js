import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props){

  // Счётчик выделений
  const [count, setCount] = useState(0);

  /* const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  } */
  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}{props.item.count}
      </div>
      <div className="Item-price">
        {props.item.price}&nbsp;&#8381;
      </div>
      {}
      <div className='Item-actions'>
        <button onClick={() => props.handleClick(props.item.code)}>
          {props.buttonName}
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
  onDelete: () => {},
  onSelect: () => {},
}

export default React.memo(Item);
