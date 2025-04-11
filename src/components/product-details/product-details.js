import { memo } from 'react';
import { numberFormat } from '../../utils';
import './style.css';

function ProductDetails({ product, language, priceTitle, productDetails }) {
  return (
    <>
      <ul className="Product-details">
        {productDetails.map(({ translationCode, id }) => (
          <li className="Product-details-item" key={id}>
            <span>{translationCode}:</span>
            <b>{product[id]?.title ?? product[id]}</b>
          </li>
        ))}
      </ul>

      <div className="Product-price">
        <b>{priceTitle}</b>
        <b>{numberFormat(product.price, language)}</b>
      </div>
    </>
  );
}

export default memo(ProductDetails);
