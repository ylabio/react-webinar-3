import React from "react";
import Head from "../head";
import List from "../list";
import {formatMoney} from "../../utils";
import "./style.css";

const CartModal = ({title, list, onDeleteItem, onClose, total }) => {
  return (
    <div className="Cart-modal-overlay">
      <div className="Cart-modal">
         <Head title={title}>
           <button className="Cart-modal-close" onClick={onClose}>
             Закрыть
           </button>
         </Head>
         <List list={list} onAction={onDeleteItem} actionTitle={"Удалить"} />
         <div className="Cart-modal-total">
           <strong>
             {list.length > 0 ? `Итого` : 'Корзина пуста'}
           </strong>
           <strong>
            {list.length ? `${formatMoney(total)}` : ''}
           </strong>
         </div>
         {/* <div className="Cart-modal-total">
           <strong>Итого</strong>
           <strong>{total}</strong>
         </div> */}
      </div>
    </div>
  );
};

export default CartModal;