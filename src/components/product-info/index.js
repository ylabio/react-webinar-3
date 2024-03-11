import {memo, useContext} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";
import { LanguageContext } from "../../languageContext";

function ProductInfo (props) {

    const [language, setLanguage] = useContext(LanguageContext)

    const cn = bem('Product');

    const text = {
        ru: {
            country: 'Страна производитель',
            category: 'Категория',
            year: 'Год выпуска',
            cost: 'Цена',
            add: 'Добавить'
        },
        eng: {
            country: 'Made in',
            category: 'Category',
            year: 'Year',
            cost: 'Cost',
            add: 'Add into basket'
        }
    }

    return (
        <div className={cn('')}>
            <p>{props.description}</p>
            <p>
                {text[language].country}: 
                <strong> {props.madeIn}</strong>
            </p>
            <p>
                {text[language].category}: 
                <strong> {props.category}</strong>
            </p>
            <p>
                {text[language].year}: 
                <strong> {props.year}</strong>
            </p>
            <p>
                <strong>{text[language].cost}: {numberFormat(props.cost)} ₽</strong>
            </p>
            <button onClick={() => props.addToBasket(props._id)}>{text[language].add}</button>
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