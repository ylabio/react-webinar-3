import { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";

function ProductDescription({ product, onAddToBasket }) {
  return (
    <div className="container">
      <div className="description">{product.description}</div>
      <div className="category">
        Страна производитель: &nbsp;
        <span>
          {product.madeIn.title}&nbsp;({product.madeIn.code})
        </span>
      </div>
      <div className="category">
        Категория: &nbsp;
        <span>{product.category.title}</span>
      </div>
      <div className="category">
        Год выпуска:&nbsp;
        <span>{product.edition}</span>
      </div>
      <div className="price">Цена: {product.price} &#8381;</div>
      <button className="add" onClick={() => onAddToBasket(product._id)}>
        Добавить
      </button>
    </div>
  );
}

export default memo(ProductDescription);

ProductDescription.propTypes = {
  product: PropTypes.object,
  onAddToBasket: PropTypes.func,
};
