import { memo } from "react";
import PropTypes from 'prop-types';
import useSelector from "../../store/use-selector";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';


function ProductCard(props) {

    const language = useSelector(state => state.language);

    const cn = bem('ProductCard');

    const date = new Date(props?.product?.dateCreate);
    const year = date.getFullYear();

    return (
        <div className={cn()}>
            <span className={cn('description')}>{props.product?.description}</span>
            <div className={cn('countryContainer')}>
                {language.countryOfManufacture}:
                <span className={cn('country')}>
                    {props.product?.madeIn?.title}
                    ({props.product?.madeIn?.code})
                </span>
            </div>
            <div className={cn('categoryContainer')}>
                {language.category}:
                <span className={cn('category')}>
                    {props.product?.category?.title}
                </span>
            </div>
            <div className={cn('yearContainer')}>
                {language.year}:
                <span className={cn('year')}>
                    {year}
                </span>
            </div>
            <div className={cn('priceContainer')}>
                {language.price}: {numberFormat(props.product?.price)} ₽
            </div>
            <button className={cn('button')} type="button" onClick={props.onAdd}>
                {language.add}
            </button>
        </div>
    )
}

ProductCard.propTypes = {    
    product: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        price: PropTypes.number
    }).isRequired,
    onAdd: PropTypes.func
};

export default memo(ProductCard);