import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";

function ProductInfo (props) {

    const cn = bem('Product');

    return (
        <div className={cn('')}>
            <p>{props.description}</p>
            <p>
                Страна производитель: 
                <strong> {props.madeIn}</strong>
            </p>
            <p>
                Категория: 
                <strong> {props.category}</strong>
            </p>
            <p>
                Год выпуска: 
                <strong> {props.year}</strong>
            </p>
            <p>
                <strong>Цена: {numberFormat(props.cost)} ₽</strong>
            </p>
            <button onClick={() => props.addToBasket(props._id)}>Добавить</button>
        </div>
    )
}

ProductInfo.propTypes = {
    addToBasket: PropTypes.func.isRequired,
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    cost: PropTypes.number
  };
  
  ProductInfo.defaultProps = {
    addToBasket: (id) => {},
  }

export default memo(ProductInfo)