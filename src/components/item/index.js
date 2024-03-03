import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';
import controls from "../controls";
import Controls from "../controls";

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(0);

  

  
    const callbacks = {
     onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
  
    }

  return (
    <div className='Item'>
      
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className="price-actions">
        {props.item.price.toString().replace(/(\d)(?=(\d{3})+$)/g,'$1 ')} &#8381;
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          Добавить
          
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
