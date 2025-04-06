import React from 'react';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

const ProductDetails = ({ desc, country, category, edition, price, handleAddProduct }) => {
    const cn = bem('Product-page');
    return (
        <div className={cn()}>
            <p>{desc}</p>
            <div className={cn('info')}>
                <p className={cn('info-item')}>Страна производитель:</p>
                <span><b>{country}</b></span>
                <p className={cn('info-item')}>Категория:</p>
                <span className={cn('info-item')}><b>{category}</b></span>
                <p>Год выпуска:</p>
                <span className={cn('info-item')}><b>{edition}</b></span>
            </div>
            <h2 className={cn('price')}>Цена: {price.toLocaleString('ru-RU')} ₽</h2>
            <Button style="primary" onClick={handleAddProduct} titleKey="addButton" />
        </div>
    )
}

ProductDetails.propTypes = {
    desc: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    edition: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    handleAddProduct: PropTypes.func.isRequired
}

export default React.memo(ProductDetails)