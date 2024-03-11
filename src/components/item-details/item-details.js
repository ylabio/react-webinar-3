import { memo } from "react";
import './style.css';
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { useTranslation } from "../../utils/useTranslition";
function ItemDetail(props) {
    if (!props.item) {
        return null; 
    }
    const cn = bem('itemDetail');
    const { _id, description, price, madeIn, category, edition } = props.item;
    const callbacks = {
        onAdd: (e) => props.onAdd(props.item._id)
    }
    const t = useTranslation();
    return (
        <>
            <div className={cn()}>
                <div className={cn('title')}>{t('description')}: {description}</div>
                <div className={cn('country')}>{t('manufacturerCountry')}: <span className={cn('country-title')}>{madeIn?.title} ({madeIn?.code})</span></div>
                <div className={cn('category')}>{t('category')}: <span className={cn('category-title')}>{category?.title}</span></div>
                <div className={cn('year')}>{t('releaseYear')}: {edition}</div>
                <div className={cn('price')}>{t('price')}: {numberFormat(price)}</div>
                <button className={cn('button')} onClick={callbacks.onAdd}>{t('addItem')}</button>
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




