import React, { useState,useEffect,useMemo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Title from "../title";
import List from "../list";
import { useBasket } from "../basketContext";

function Basket({basketList,onFunc}) {
    const {visible,onBasketVisible} = useBasket();
    const [sum, setSum] = useState(0);
    
    useMemo(()=>{
        setSum(basketList.reduce((acc,curr) => acc + (curr.price*curr.count),0));
    },[basketList])
    
    return (
      <div className={"Basket" + (visible ? ' visible' : '')}>
        <div className="Basket-background" onClick = {() => onBasketVisible()}></div>
        <div className="Basket__inner">
            <div className="Basket__top">
                <Title className="Basket-title">Корзина</Title>
                <button className="Basket-btn Basket-btn--close" onClick = {() => onBasketVisible()}>Закрыть</button>
            </div>
            <div className="Basket__middle">
                {basketList.length !=0 ?
                    <List list={basketList} onFunc={onFunc} button = 'Удалить'/>
                : ''
                }
            </div>
            <div className="Basket__bottom">
                <span>Итого &nbsp;&nbsp;&nbsp;{sum}</span>
            </div>
        </div>
        
      </div>
    )
}


export default React.memo(Basket);
