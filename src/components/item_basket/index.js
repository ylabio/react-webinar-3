import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onButtonAction(props.item.code);
    }
  }

  return (
    <div className={'Item-basket'}>
      <div className='Item-basket-code'>{props.item.code}</div>
      <div className='Item-basket-title'>{props.item.title}</div>
			<div className="Item-basket-price">
				<span>{props.item.price} ₽</span>
				<span>{props.item.count} шт</span>
			</div>
      <div className='Item-basket-actions'>
        <button onClick={callbacks.onAction}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  onButtonAction: PropTypes.func,
};

ItemBasket.defaultProps = {
  onButtonAction: () => {
  },
}

export default React.memo(ItemBasket);
