
import React from 'react'
import {formatPrice} from '../../utils'
import "./style.css";
import { useTranslation } from '../../store/translation'

const ProductDetails = ({product, onAddToBasket}) => {

	const {t} = useTranslation()

	return (
    <div className="ProductDetails">
      <p>{product.description}</p>
      <p>
        {t("productMadeIn")}:{" "}
        <strong>{`${product.madeIn.title} (${product.madeIn.code})`}</strong>
      </p>
      <p>
        {t("productCategory")}: <strong>{product.category.title}</strong>
      </p>
      <p>
        {t("productReleaseYear")}: <strong>{product.edition}</strong>
      </p>
      <h2>
        {t("price")}: {formatPrice(product.price)}
      </h2>
      <button onClick={() => onAddToBasket(product._id)}>{t('addBtn')}</button>
    </div>
  );
}

export default ProductDetails