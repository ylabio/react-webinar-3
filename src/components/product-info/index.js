import {memo, useContext} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { numberFormat } from "../../utils";
import { LanguageContext } from "../../languageContext";
import jsonText from './text.json'

function ProductInfo (props) {

    const [language, setLanguage] = useContext(LanguageContext)

    const cn = bem('Product');

    const text = jsonText;

    return (
        <div className={cn('')}>
            <p>{props.description}</p>
            <p>
                {text[language].country}: 
                <strong> {props.madeIn} ({props.madeInCode})</strong>
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
    madeInCode: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    cost: PropTypes.number
  };
  
  ProductInfo.defaultProps = {
    addToBasket: (id) => {},
  }

export default memo(ProductInfo)