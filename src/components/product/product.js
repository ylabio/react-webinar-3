import { memo } from 'react';
import Button from '../button';

import './style.css';

function Product({ product, onAddToBasket, renderProductDetails, buttonTitle }) {
  return (
    <div className="Product">
      <span>{product.description}</span>
      {renderProductDetails(product)}
      <Button style="primary" onClick={() => onAddToBasket(product._id)} title={buttonTitle} />
    </div>
  );
}

export default memo(Product);
