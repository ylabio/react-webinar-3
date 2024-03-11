import { memo } from "react";
import './style.css';
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
function ItemDetail(props) {
    if (!props.item) {
        return null; 
    }
    const cn = bem('itemDetail');
    const { _id, description, price, madeIn, category, edition } = props.item;
    const callbacks = {
        onAdd: (e) => props.onAdd(props.item._id)
    }
    return (
        <>
            <div className={cn()}>
                <div className={cn('title')}>Описание: {description}</div>
                <div className={cn('country')}>Страна производитель: <span className={cn('country-title')}>{madeIn?.title} ({madeIn?.code})</span></div>
                <div className={cn('category')}>Категория: <span className={cn('category-title')}>{category?.title}</span></div>
                <div className={cn('year')}>Год выпуска: {edition}</div>
                <div className={cn('price')}>Цена: {numberFormat(price)}</div>
                <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
            </div>
        </>
    );
}
ItemDetail.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        price: PropTypes.number
    }).isRequired,
    onAdd: PropTypes.func,
};

ItemDetail.defaultProps = {
    onAdd: () => { },
}
export default memo(ItemDetail);




