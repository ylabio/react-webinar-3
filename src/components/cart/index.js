import React, {useState} from "react";
import PropTypes from 'prop-types'
import CartView from "../cart-view";
import {plural} from "../../utils";
import {setPriceFormat} from '../../utils'
import "./style.css";

const Cart = ({totalCount, totalPrice, list, onDeleteItem}) => {

  const [isOpen, setIsOpen] = useState(false);

  const count = list.length;

  return (
    <>
      <div className="Cart List-item">
        <span>В корзине:
          <strong  class="Cart-info">
            {count ? ` ${totalCount} ${plural(totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / 
            ${setPriceFormat(totalPrice)} ` : " пусто "}
          </strong>
        </span>
        <button className={'Cart-open'} onClick={() => setIsOpen(true)}>Перейти</button>
      </div>
      {isOpen && (
        <CartView
          totalPrice={totalPrice}
          onClose={() => setIsOpen(false)}
          onDeleteItem={onDeleteItem}
          list={list}
        />
      )}
    </>
  );
};

Cart.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
	list: PropTypes.object,
	onDeleteItem: PropTypes.func
};

export default React.memo(Cart);