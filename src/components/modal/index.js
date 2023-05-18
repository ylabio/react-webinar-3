import React, {useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";

function Modal({cart, cartInfo, onDeleteItem, onGetCartInfo, onOpenModal, isOpenModal}){

    return (
        <div className={`Modal-overlay ${!isOpenModal ? 'open': ''}`}>
            <div className={`Modal-window ${!isOpenModal ? 'open' : ''}`}>
                <Head title={'Корзина'}>
                    <button className='Modal-btn-close' onClick={() => onOpenModal()}>Закрыть</button>
                </Head>
                <div className='Modal-space'></div>
                <List list={cart} onDeleteItem={onDeleteItem} onGetCartInfo={onGetCartInfo}/>
                <div className='Modal-footer'>
                    <p><strong><span>Итого</span> <span>{new Intl.NumberFormat('ru-RU').format(cartInfo.totalPrice)} ₽</span></strong></p>
                </div>
            </div>
        </div>
  )
}


export default React.memo(Modal);
