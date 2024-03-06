import React, { useState,useMemo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useModal } from "../modalContext";
import Title from "../title";
import List from "../list";
import Modal from "../modal"
import {formatPrice } from "../../utils";
import itemBasket from "../itemBasket";


function Basket({basketList,onFunc,info}) {
    const [sum, setSum] = useState(0);
    const {visible,onModalVisible} = useModal();
    
    useMemo(()=>{
        if (info != undefined){
            setSum(info[0].sum);
        }
    },[basketList])
    // console.log(itemBasket)
    const sumPlural = `${formatPrice(sum)} ₽`
    
    return (
        <Modal type='basket'>
            <div className="Basket__inner">
                <div className="Basket__top">
                    <Title className="Basket-title">Корзина</Title>
                    <button className="Basket-btn Basket-btn--close" onClick = {() => onModalVisible()}>Закрыть</button>
                </div>
                <div className="Basket__middle">
                    {basketList.length !=0 ?
                        <List list={basketList} onFunc={onFunc} button = 'Удалить' Items={itemBasket}></List>
                    : ''
                    }
                </div>
                <div className="Basket__bottom">
                    <span>Итого &nbsp;&nbsp;&nbsp;{sumPlural}</span>
                </div>
            </div>
        </Modal>
      
    )
}


export default React.memo(Basket);
