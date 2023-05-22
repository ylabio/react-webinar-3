import React from "react";
import PropTypes from "prop-types";
import { addSpacesToNumber } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-descr'>
        <div className="Item-price">
          {addSpacesToNumber(props.item.price)} ₽
        </div>
        {
          props.isModalOpen ? <div className="Item-qty">{props.item.count} шт</div> : null
        }
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
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
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

Item.defaultProps = {
  onClick: () => { }
}

export default React.memo(Item);
