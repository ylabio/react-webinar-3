import React, { useState } from "react";
import {formatMoney, plural} from "../../utils";
import "./style.css";

const Controls = ({ list, showModal, totalPrice }) => {
  return (
    <>
      <div className="Controls">
         <p className={'Controls-title'}>В корзине:</p>
         <p className={'Controls-products'}>
          {list.length > 0 ? `${list.length} ${plural(list.length, {one: 'товар', few: 'товара', many: 'товаров'})} ` : 'пусто'}
          {totalPrice > 0 ? `/ ${formatMoney(totalPrice)}` : ''}
        </p>
        <button onClick={() => showModal()} style={{width: '80px'}}>Перейти</button>
      </div>
    </>
  );
};

export default Controls;