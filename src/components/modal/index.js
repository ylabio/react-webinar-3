import React from "react";
import './style.css';
import Head from "../head";
import List from "../list";
import {getNumberFormat} from "../../utils";

function Modal({cart, cartInfo, onDeleteItem, onGetCartInfo, onOpenModal}){

  return (
  <div className='Modal-overlay'>
    <div className='Modal-window'>
      <Head title={'Корзина'}>
          <button className='Modal-btn-close' onClick={() => onOpenModal()}>Закрыть</button>
      </Head>
      <div className='Modal-space'></div>
      <List list={cart} onDeleteItem={onDeleteItem} onGetCartInfo={onGetCartInfo}/>
      <div className='Modal-footer'>
        <p><strong><span>Итого</span> <span>{getNumberFormat(cartInfo.totalPrice)} ₽</span></strong></p>
      </div>
    </div>
</div>
)
}


export default React.memo(Modal);
