import { memo } from 'react';
import { Link } from 'react-router-dom';
import {numberFormat} from "../../utils";
import './style.css';


function Info({ item, category, country }) {

    return (
        <div className='Info'>
            <Link className='Item-link' to='/'>Главная</Link>
            <div className='Info-description'>
                {item.description}
            </div>
            <div className='Info-country'>
                Страна производитель: <b>{country}</b>
            </div>
            <div className='Info-category'>
                Категория: <b>{category}</b>
            </div>
            <div className='Info-year'>
                Год выпуска: <b>{new Date(item.dateCreate).getFullYear()}</b>
            </div>
            <div className='Info-price'>
                <b>Цена: {numberFormat(item.price)} ₽</b>
            </div>
        </div>
    );
}

export default memo(Info);