
import React from "react";
import './style.css';
import Head from '../head';
import List from '../list';
import Header from '../header';
import Button from '../button';


function Cart( props ) {
    return (
        <div className='Cart'>
            <Header>
                <Head title={'Корзина'}/>
                <Button onClick={props.onClose} title={'Закрыть'}  />
            </Header>
            <div className='Cart-list'>
                <List list={props.goods} onClick={props.onDelete} cart={props.cart}/>
            </div>
            <div className='Cart-footer'> <span className='Cart-text'>Итого</span> {props.totalSum} ₽</div> 
        </div>
    )
}

export default Cart;