import React from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import './style.css';
import PageLayout from "../page-layout";
import Head from "../head";
import List from "../list";

function Basket({list, totalPrice, onDeleteItemToCart, setActive}){
  const cn = bem('Basket');
  return (
    <div className={cn("popup")}>
        <div className={cn("content")}>
            <Head title="Корзина" style={{borderRadius: 10}}>
                <button className={cn("close")} onClick={() => setActive(false)}>Закрыть</button>
            </Head>


            <List list={list} buttonText="Удалить" action={onDeleteItemToCart}/>

            <div className={cn("priceInfo")}>
                {
                    list.length ?
                        <>
                            <div className={cn("priceInfo-text")}>Итого</div>
                            <div className={cn("priceInfo-value")}>{totalPrice} ₽</div>
                        </>
                    :
                        <div className="priceInfo-empty">Товаров в корзине нету!</div>
                }



            </div>
        </div>
    </div>
  )
}

Basket.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    totalPrice: PropTypes.number,
    onDeleteItemToCart: PropTypes.func,
    setActive: PropTypes.func
};

Basket.defaultProps = {
  list: [],
}

export default React.memo(Basket);
