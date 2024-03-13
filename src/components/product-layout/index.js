import React from 'react'
import {cn as bem} from "@bem-react/classname"
import "./style.css"
import { numberFormat } from '../../utils';

function ProductLayout(props) {
    const cn = bem("Product");

    const {
        countryOfOrigin: countryOfOriginText,
        category: categoryText, 
        yearOfIssue : yearOfIssueText,
        price : priceText,
        add : addText} = props.text;

    const {madeIn,category,edition,price,description} = props.product;

    

    return (
        <div className={cn("content")}>
                <p>{description}</p>
                <p>{countryOfOriginText}: <b>{madeIn?.title} ({madeIn?.code})</b></p>
                <p>{categoryText}: <b>{category?.title}</b></p>
                <p>{yearOfIssueText}: <b>{edition}</b></p>
                <h1>{priceText}: {numberFormat(price)} ₽</h1>
                <button onClick={props.addToBasket}>{addText}</button>
        </div>    
    )
}

export default ProductLayout