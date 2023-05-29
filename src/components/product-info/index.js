import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import {useLanguage} from "../../hooks";

function ProductInfo({product, onAdd}) {
  const {t} = useLanguage()

  const cn = bem('ProductInfo');

  if (!product) return <div>Loading...</div>

  const year = new Date(product.dateCreate).getFullYear()

  const callbacks = {
    onAdd: () => onAdd(product._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>{product.description}</p>
      <p className={cn('text')}>
        {t("Manufacturer country")}: <span className={cn('text', {weight: "bold"})}>
        {product.madeIn.title} ({product.madeIn.code})
      </span>
      </p>
      <p className={cn('text')}>
        {t("Category")}: <span className={cn('text', {weight: "bold"})}>
        {product.category.title}
      </span>
      </p>
      <p className={cn('text')}>
        {t("Year of issue")}: <span className={cn('text', {weight: "bold"})}>
        {year}
      </span>
      </p>
      <p className={cn('price')}>
        {t("Price")}: {numberFormat(product.price)} ₽
      </p>
      <button className={cn('button')} onClick={callbacks.onAdd}>{t("Add")}</button>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    edition: PropTypes.number,
    dateCreate: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
  }),
  onAdd: PropTypes.func.isRequired
}

export default memo(ProductInfo);
