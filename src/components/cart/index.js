import React from 'react';
import './style.css';
import Head from "../head";
import List from "../list";
import {Sum_total} from "../../utils";
import {Format_Price} from "../../utils";
export function Cart({cart, onDoSmth, onClose}) {
    return (
        <>
            <div className={'background'}/>
            <div className={'Cart'}>
                <Head title='Корзина'>
                    <button className={'button_pointer'} onClick={onClose}>Закрыть</button>
                </Head>
                {cart.length > 0 ?
                    <div>
                        <List onAction={onDoSmth} list={cart}/>
                        <div className={'total-block'}>
                            <span>Итого</span>
                            <span className={'total-value'}>{Format_Price(Sum_total(cart))} &#8381;</span>
                        </div>
                    </div>
                    : <p className={'info-empty'}>Корзина пуста</p>}
            </div>
        </>
    );
}