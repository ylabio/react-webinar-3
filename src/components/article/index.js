import {memo, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import { numberFormat } from "../../utils";
import { locale } from "../../locale";

function Article({item, onAdd, lang}) {

    const callbacks = {
        onAdd: (e) => onAdd(item._id)
    }

    return (
        <div className="Article">
            <div className="Article-paragraph">{item.description}</div>
            <div className="Article-paragraph">{locale[lang].description.country}<b>{item.madeIn.title} ({item.madeIn.code})</b></div>
            <div className="Article-paragraph">{locale[lang].description.category}<b>{item.category.title}</b></div>
            <div className="Article-paragraph">{locale[lang].description.year}<b>{item.edition}</b></div>
            <div className="Article-paragraph Article_big"><b>{locale[lang].description.price}{numberFormat(item.price) + ' ₽'}</b></div>
            <button onClick={callbacks.onAdd}>{locale[lang].description.add}</button>
        </div>
    )
}

Article.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            title: PropTypes.string,
            code: PropTypes.string,
        }),
        category: PropTypes.shape({
            title: PropTypes.string,
        }),
        edition: PropTypes.number,
        price: PropTypes.number
    }).isRequired,
    onAdd: PropTypes.func,
    lang: PropTypes.string,
};

Article.defaultProps = {
    onAdd: () => {},
}

export default memo(Article);