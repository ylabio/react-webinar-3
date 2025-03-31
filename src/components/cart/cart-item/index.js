import React from 'react';
import './style.css';
import {numFormat} from "../../../utils";
import Buttons from "../../buttons";
import PropTypes from "prop-types";

const CartItem = ({ item = {}, onDeleteFromCart = () => {} }) => {
  return (
    <li className={'List-item'}>
      <div className={'Cart-Item'}>
        <div className="Cart-Item-title">
          <b>{item.title}</b>
          <div className='Cart-Item-title-right'>
            <div>
              <div>{item.count} шт</div>
            </div>

            <span>{numFormat(item.price) + ' ₽'}</span>
          </div>
        </div>
        <div className="Cart-Item-actions">
          <Buttons onClick={() => onDeleteFromCart(item.code)} variant="delete">
            Удалить
          </Buttons>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  onDeleteFromCart: PropTypes.func,
}

export default React.memo(CartItem);
