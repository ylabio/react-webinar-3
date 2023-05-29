import {memo} from "react";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import {translateWord} from "../../utils";
import "./style.css";

function ProductInfo({productInfo, onAddItem, selectedLanguage}) {
  
  const cn = bem("ProductInfo");

  const callbacks = {
    onAdd: id => onAddItem(id),
  };

  if (!productInfo) {
    return <h3 className={cn("loading")}>Загрузка...</h3>
  }

  return (
    <div className={cn()}>
      <p>{productInfo.description}</p>
      <div className={cn("details")}>
        {translateWord("Страна производитель", selectedLanguage)}: <p>{productInfo.madeIn?.title} ({productInfo.madeIn?.code})</p>
      </div>
      <div className={cn("details")}>{translateWord("Категория", selectedLanguage)}: <p>{productInfo.category?.title}</p></div>
      <div className={cn("details")}>{translateWord("Год выпуска", selectedLanguage)}: <p>{productInfo.edition}</p></div>
      <h3>{translateWord("Цена", selectedLanguage)}: {numberFormat(productInfo.price)} ₽</h3>
      <button onClick={() => callbacks.onAdd(productInfo._id)}>{translateWord("Добавить", selectedLanguage)}</button>
    </div>
  );
}

ProductInfo.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  selectedLanguage: PropTypes.string,
  onAddItem: PropTypes.func,
};

ProductInfo.defaultProps = {
  onAddItem: () => {},
};

export default memo(ProductInfo);
