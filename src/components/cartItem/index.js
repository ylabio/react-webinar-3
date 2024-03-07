import React from 'react';

function CartItem({ item, cnt, onDelete }) {
  const { code, title, price } = item;
  return (
    <div className="Item_modal">
      <div className="Item-code_modal">{code}</div>
      <div className="Item-title_modal">{title}</div>
      <div className="price-actions_modal">
        {price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} &#8381;
      </div>
      <div className="cnt-actions_modal">{cnt} &nbsp;шт</div>
      <div className="Item-actions_modal">
        <button className="btn_delete" onClick={() => onDelete(code)}>Удалить</button>
      </div>
    </div>
  );
}

export default CartItem;
