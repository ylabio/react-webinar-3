import React from 'react'
import {cn as bem} from "@bem-react/classname"
import "./style.css"
import { numberFormat } from '../../utils';
import PropTypes from 'prop-types';

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

ProductLayout.propTypes = {
    text: PropTypes.shape({
        countryOfOrigin: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        yearOfIssue: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        add: PropTypes.string.isRequired
    }).isRequired,
    product: PropTypes.shape({
        madeIn: PropTypes.shape({
            title: PropTypes.string.isRequired,
            code: PropTypes.string.isRequired
        }),
        category: PropTypes.shape({
            title: PropTypes.string.isRequired
        }),
        edition: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired, 
    addToBasket: PropTypes.func.isRequired
};

export default ProductLayout