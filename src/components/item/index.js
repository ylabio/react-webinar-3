import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props){

  // Счётчик выделений
  //const [count, setCount] = useState(0);

  const callbacks = {
   // onClick: () => {
    //  props.onSelect(props.item.code);
   //   if (!props.item.selected) {
    //    setCount(count + 1);
   //   }
  //  },
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className='Item-price'>
        {props.item.price} &#8381;
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAdd}>
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
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Item);
