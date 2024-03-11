import { memo } from "react";
import './style.css';
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
function ItemDetail(props) {
    if (!props.item) {
        return null; 
    }
    const { _id, description, price, madeIn, category, edition } = props.item;
    const callbacks = {
        onAdd: (e) => props.onAdd(props.item._id)
    }
    return (
        <>
            <div>
                <div>Описание: {description}</div>
                <div>Цена: {price}</div>
                <div>Страна производитель: {madeIn?.title} ({madeIn?.code})</div>
                <div>Категория: {category?.title}</div>
                <div>Год выпуска: {edition}</div>
                <div>Цена: {numberFormat(price)}</div>
                <button onClick={callbacks.onAdd}>Добавить</button>
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




