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
				{props.item.count?<span>{props.item.count} шт</span>:""}
			</div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAction}>{props.buttonTitle}</button>
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
	buttonTitle: PropTypes.string,
  onButtonAction: PropTypes.func,
};

Item.defaultProps = {
  onButtonAction: () => {
  },
}

export default React.memo(Item);
