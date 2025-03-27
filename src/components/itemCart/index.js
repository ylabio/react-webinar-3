import React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import './style.css';

function ItemCart(props) {

  const callbacks = {

    onClick: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className="ItemCart">
      <div className="ItemCart-title">
        <b>{props.item.title}</b>
      </div>

      <div className="ItemCart-count">{props.item.score} шт</div>
      <div className="ItemCart-price">
        <NumericFormat value={props.item.price}
        displayType={'text'}
        thousandSeparator=" "
        suffix={' ₽'} />
        </div>

      <div className="ItemCart-actions">
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

ItemCart.defaultProps = {
  onDelete: () => {},
};

export default React.memo(ItemCart);

