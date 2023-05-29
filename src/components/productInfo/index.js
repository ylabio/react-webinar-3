import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../store/use-selector";
import { languageConfig } from "../../languages";
import {cn as bem} from "@bem-react/classname";

function productInfo({addToBasket, description, country, category, price, year, id}){
  const language = useSelector(state => state.language.language);
  const addLabel = language === 'RU' ? languageConfig.add.rus : languageConfig.add.eng;
  const countryLabel = language === 'RU' ? languageConfig.country.rus : languageConfig.country.eng;
  const categoryLabel = language === 'RU' ? languageConfig.category.rus : languageConfig.category.eng;
  const yearLabel = language === 'RU' ? languageConfig.year.rus : languageConfig.year.eng;
  const priceLabel = language === 'RU' ? languageConfig.price.rus : languageConfig.price.eng;

  const cn = bem("Product");

  return (
    <div className={cn()}>
      <div className={cn("item")}>{description}</div>
      <div className={cn("item")}>
        <span className={cn("item-title")}>{`${countryLabel}: `}</span>
        <span className={cn("item-description")}>{country}</span>
      </div>
      <div className={cn("item")}>
        <span className={cn("item-title")}>{`${categoryLabel}: `}</span> 
        <span className={cn("item-description")}>{category}</span>
      </div>
      <div className={cn("item")}>
        <span className={cn("item-title")}>{`${yearLabel}: `}</span>
        <span className={cn("item-description")}>{year}</span>
      </div>
      <div className={cn("item")}>{`${priceLabel}: ${price}`}</div>
      <button type='button' onClick={() => addToBasket(id)}>{addLabel}</button>
    </div>
  )
}

productInfo.propTypes = {
  description: PropTypes.string,
  country: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  year: PropTypes.number,
  id: PropTypes.string,
  addToBasket: PropTypes.func,
};

productInfo.defaultProps = {
  addToBasket: (item) => {},
  description: '',
  country: '',
  category: '',
  price: '',
  year: '',
  id: '',
}

export default memo(productInfo);
