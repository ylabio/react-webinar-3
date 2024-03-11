import {memo, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import { numberFormat } from "../../utils";

function Article({item, onAdd}) {

    const callbacks = {
        onAdd: (e) => onAdd(item._id)
    }

    return (
        <div className="Article">
            <div className="Article-paragraph">{item?.description}</div>
            <div className="Article-paragraph">Страна производитель: <b>{item?.madeIn.title} ({item?.madeIn.code})</b></div>
            <div className="Article-paragraph">Категория: <b>{item?.category.title}</b></div>
            <div className="Article-paragraph">Год: <b>{item?.edition}</b></div>
            <div className="Article-paragraph">Цена: <b>{numberFormat(item?.price)}</b></div>
            <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}

export default memo(Article);