import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onButtonAction(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
			<div className="Item-price">
				<span>{props.item.price} ₽</span>
			</div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAction}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price:PropTypes.number,
  }).isRequired,
  onButtonAction: PropTypes.func,
};

Item.defaultProps = {
  onButtonAction: () => {
  },
}

export default React.memo(Item);
