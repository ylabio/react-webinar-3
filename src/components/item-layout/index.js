import {memo, useMemo,useCallback} from 'react'
import { useParams } from "react-router-dom";
import {numberFormat,langArr} from "../../utils";
import Menu from "../menu";
import './style.css'

function ItemLayout({select,language,setLanguage,addToBasketRequest,openModalBasket}) {
    
    
    return (
        <>
            <Menu language={language} setLanguage={setLanguage} title={select.itemInfo.title} openModalBasket={openModalBasket} amount={select.amount} sum={select.sum}></Menu>
            <div className="Item-info__container">      
                <p className="Item-info-description">{select.itemInfo.description}</p>
                <p className="Item-info-country">{`Страна производитель:`} <span>{`${select.itemInfo.madeIn?.title} (${select.itemInfo.madeIn?.code})`}</span></p>
                <p className="Item-info-category">{`Категория:`} <span>{`${select.itemInfo.category?.title}`}</span></p>
                <p className="Item-info-date">{`Год выпуска:`} <span>{`${select.itemInfo.edition}`}</span></p>
                <p className="Item-info-price">{`Цена:  ${numberFormat(select.itemInfo.price)}₽`}</p>
                <button onClick={() => addToBasketRequest(select.itemInfo._id)}>{langArr.add[language]}</button>
            </div>
        </>
    );
}

export default memo(ItemLayout);
