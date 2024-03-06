import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: (item) => {
      props.onClick(item);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
        <span>{props.item.price.toLocaleString() + " ₽"}</span>
      </div>
      {!!props.count  && <span className='Item-count'>{props.count + " шт"}</span>}
      <div className='Item-actions'>
        <button onClick={() => callbacks.onClick(props.item)}>
          {props.title}
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
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func
};

Item.defaultProps = {
  count: 0,
  onClick: () => {}
}

export default React.memo(Item);
