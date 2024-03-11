import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";

const ProductDescription = ({ product, onAdd, valueLang }) => {
  const callbacks = {
    onAdd: (e) => onAdd(product["_id"]),
  };

  return (
    <section className="ProductDescription">
      <section>
        <p>Описание товара: {product?.description}</p>
        <p>
          Страна производитель: <strong>{product?.madeIn?.title}</strong>
        </p>
        <p>
          Категория: <strong>{product?.category?.title}</strong>
        </p>
        <p>
          Год выпуска: <strong>{product?.edition}</strong>
        </p>
        <p>
          <strong>Цена: {numberFormat(product?.price)} ₽</strong>
        </p>
      </section>
      <button onClick={callbacks.onAdd}>{ valueLang ? 'Добавить' : 'Add' }</button>
    </section>
  );
};

ProductDescription.PropTypes = {
  product: PropTypes.arrayOf(PropTypes.shape({  
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.string,
    price: PropTypes.string})).isRequired,
  onAdd: PropTypes.func,
  valueLang: PropTypes.bool,
};

ProductDescription.defaultProps = {
  onAdd: () => {},
  valueLang: true,
}

export default memo(ProductDescription);
