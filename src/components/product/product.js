import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Button from '../button';

import './style.css';

function Product({ product, onAddToBasket, renderProductDetails, title, buttonTitle }) {
  return (
    <div className="Product">
      <span></span>
      <Link className="Product-back" to={ROUTES.MAIN}>
        <span>{title}</span>
      </Link>
      <span>{product.description}</span>
      {renderProductDetails(product)}
      <Button style="primary" onClick={() => onAddToBasket(product._id)} title={buttonTitle} />
    </div>
  );
}

export default memo(Product);
