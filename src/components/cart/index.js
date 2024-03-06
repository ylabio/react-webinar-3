
import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import List from '../list';
import Header from '../header';
import Button from '../button';
import { priceFormatter } from '../../utils';

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
            <div className='Cart-footer'> <span className='Cart-text'>Итого</span> {priceFormatter(props.totalSum)} </div> 
        </div>
    )
}

Cart.propTypes = {
    title: PropTypes.string,
    goods: PropTypes.arrayOf.isRequired,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func
  };
  
Cart.defaultProps = {
    onClose: () => {
    },
    onDelete: () => {
    },
}



export default Cart;