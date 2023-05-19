import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const onAddItem = () => {
    props.onAddItem(props.item.code, props.item.title, props.item.price);
  }
  const onDeleteItem = ()=>{
    props.onDeleteItem(props.item.code, props.item.quantity )
  }

  return (
    <div className='Item'>
      <div className='Item-code'>
        {props.item.code}
      </div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price} ₽
      </div>
        {props.item.quantity ?
          <div className='Item-price'>
            {props.item.quantity} шт
          </div>: <></>
        }
      <div className='Item-actions'>
          {
            props.active?
              <button onClick={onDeleteItem}>
                Удалить
              </button>
              :<button onClick={onAddItem}>
                 Добавить
              </button>
          }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
    onAddItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    active: PropTypes.bool
};

Item.defaultProps = {
 onAddItem: () => {},
 onDeleteItem: () => {},
}

export default React.memo(Item);
