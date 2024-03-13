import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { memo } from "react";

function ItemProduct({translations, product, addToBasket}) {
  const cn = bem('ItemProduct');

  return (
    <div className={cn() }>
      <p className={cn('text')}>{product?.description}</p>
      <p className={cn('text')}> {translations.country}: <span>{product.madeIn?.title} ({product.madeIn?.code})</span></p>
      <p className={cn('text')}> {translations.category}: <span>{product.category?.title}</span></p>
      <p className={cn('text')}> {translations.year}: <span>{product.edition}</span></p>
      <p className={cn('text')}><span>{translations.price}: {product.price} ₽</span></p>
      <button className={cn('button')} onClick={() => addToBasket(product._id)}>{translations.add}</button>
    </div>
  )
}

ItemProduct.propTypes = {
    product: PropTypes.shape( {
      _id: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      madeIn: PropTypes.object,
      category: PropTypes.object,
      edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      price: PropTypes.number
    }).isRequired,
    addToBasket: PropTypes.func,
    translations: PropTypes.object
  };
  
ItemProduct.defaultProps = {
    addToBasket: () => {}
  }
  
  export default memo(ItemProduct);
