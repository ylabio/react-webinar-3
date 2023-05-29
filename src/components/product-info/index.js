import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function ProductInfo({descr, country, category, year, price, productId, title, addToBasket}) {

  const cn = bem('ProductInfo');
  console.log(productId)

  return (
    <div className={cn()}>
        <div className={cn("descr")}>
            {descr}
        </div>

        <div className={cn("type")}>
            Страна производитель: <span className={cn("bold")}>{country}</span>
        </div>

        <div className={cn("type")}>
            Категория: <span className={cn("bold")}>{category}</span>
        </div>

        <div className={cn("type")}>
            Год выпуска: <span className={cn("bold")}>{year}</span>
        </div>

        <div className={cn("price")}>
            Цена: {numberFormat(price)} ₽
        </div>

        <button onClick={() => addToBasket({_id: productId, title, price })}>Добавить</button>
    </div>
  );
}

ProductInfo.propTypes = {
  descr: PropTypes.string,
  country: PropTypes.string,
  category: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
}

ProductInfo.defaultProps = {
    descr: "Здесь скоро будет описагие товара.",
    country: "Страна",
    category: "Категория",
    year: 2023,
    price: 0.00
};

export default memo(ProductInfo);
