import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';
import Button from '../button';

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onAdd(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
      props.onClick
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);

    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} 
      </div>
      <div className='Item-info'>
        <div className='Item-price'>{props.item.price} ₽</div>
        <Button onClick={callbacks.onClick} title={'Добавить'} />        
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
