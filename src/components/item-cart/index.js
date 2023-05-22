import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item.title);
    }
  }
  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='ItemCart-title'>
        {props.item.title}
      </div>
      <div className='ItemCart-right'>
        <div className='ItemCart-price'>
          <span>{props.item.price.toLocaleString('ru-RU')}</span>
          <span> ₽</span>
        </div>
        <div className='ItemCart-count'>
          <span>{props.item.count}</span>
          <span> шт</span>
        </div>
        <div className='ItemCart-actions'>
          <button onClick={callbacks.onAction}>
            {props.buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  addToCart: PropTypes.func,
  buttonTitle: PropTypes.string,
};

Item.defaultProps = {
  onAction: () => {},
}

export default memo(Item);
