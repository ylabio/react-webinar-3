import {memo} from "react";
import PropTypes, { string } from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductPage({product, onAdd}) {
    const cn = bem('ProductPage');
    return (
        <div className={cn()}>
            <div className={cn('description')}>
                {product.description}
            </div>
            <div className={cn('country')}>
                Страна производитель: <b>{product.madeIn.title}</b>
            </div>
            <div className={cn('category')}>
                Категория: <b>{product.category.title}</b>
            </div>
            <div className={cn('edition')}>
                Год выпуска: <b>{product.edition}</b>
            </div>
            <div className={cn('price')}>
                <b>Цена: {product.price} ₽</b>
            </div>
            <div className={cn('button')}>
                <button onClick={() => onAdd(product._id)}>Довавить</button>
            </div>
        </div>
    )
}

ProductPage.propTypes = {
    product: PropTypes.shape({
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            title: PropTypes.string
        }),
        category: PropTypes.shape({
            title: PropTypes.string
        }), 
        edition: PropTypes.number,
        price: PropTypes.number
    }).isRequired,
    onAdd: PropTypes.func
}

ProductPage.defaultProps = {
    onAdd: () => {}
}

export default memo(ProductPage);