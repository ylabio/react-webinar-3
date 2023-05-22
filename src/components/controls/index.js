import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { addSpacesToNumber, plural } from "../../utils";
import item from "../item";

function Controls({list, onOpenModal}) {

  const count = list.filter(item => item.selected).length;
  const price = list.filter(item => item.selected).reduce((acc, item) => (item.count * item.price) + acc, 0);
  const countText = `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'})}`;
  const formattedPrice = `${addSpacesToNumber(price)} ₽`;

  return (
    <div className='Controls'>
      <div className="Controls-info">
        <span className="Controls-label">В корзине:</span>
        <span className="Controls-count">{count ? `${countText} / ${formattedPrice}` : "пусто"}</span>
      </div>
      <button onClick={onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    selected: PropTypes.bool,
    price: PropTypes.number
  })).isRequired,
  onOpenModal: PropTypes.func,
};

Controls.defaultProps = {
  onOpenModal: () => {},
}

export default React.memo(Controls);
