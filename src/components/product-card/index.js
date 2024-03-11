import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';


function ProductCard(props) {
    const cn = bem('ProductCard');

    const date = new Date(props?.product?.dateCreate);
    const year = date.getFullYear();

    return (
        <div className={cn()}>
            <span className={cn('description')}>{props.product?.description}</span>
            <div className={cn('countryContainer')}>
                Страна производитель:
                <span className={cn('country')}>
                    {props.product?.madeIn?.title}
                    ({props.product?.madeIn?.code})
                </span>
            </div>
            <div className={cn('categoryContainer')}>
                Категория:
                <span className={cn('category')}>
                    {props.product?.category?.title}
                </span>
            </div>
            <div className={cn('yearContainer')}>
                Год:
                <span className={cn('year')}>
                    {year}
                </span>
            </div>
            <div className={cn('priceContainer')}>
                Цена: {numberFormat(props.product?.price)} ₽
            </div>
        </div>
    )
}

export default memo(ProductCard);