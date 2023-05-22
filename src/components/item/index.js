import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    // onClick: () => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // },
    onButtonClick: () => {
      props.basket ? props.onButtonClick(props.item.code) : props.onButtonClick(props.item);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div className="Item-price">{props.item.price .toLocaleString("ru-RU")} ₽</div>
        {props.basket && <div className="Item-count">{props.item.count} шт</div>}
        <button onClick={callbacks.onButtonClick}>
          {props.basket ? "Удалить" : "Добавить"}
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
    count: PropTypes.number
  }).isRequired,
  onButtonClick: PropTypes.func,
  basket: PropTypes.bool
};

Item.defaultProps = {
  onButtonClick: () => {},
}

export default React.memo(Item);
