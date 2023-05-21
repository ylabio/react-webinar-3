import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props){
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className="Item">
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <div>
          {Intl.NumberFormat("ru",{style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(props.item.price)}
        </div>

        <div className="Item-count">{props.item.count} шт.</div>

        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(ItemBasket);
