import {cn as bem} from '@bem-react/classname';
import './style.css';
import {memo} from "react";
import PropTypes from "prop-types";
import ProductOption from "../product-option";
import {numberFormat} from "../../utils";

function ProductDetails({item, onAdd}) {
  const cn = bem('ProductDetails');

  const callbacks = {
    onAdd: () => onAdd({
      _id: item._id,
      title: item.title,
      price: item.price
    })
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>
        {item.description}
      </p>
      <ProductOption option={'Страна производитель'} value={`${item.madeIn.title} (${item.madeIn.code})`} />
      <ProductOption option={'Категория'} value={item.category.title} />
      <ProductOption option={'Год выпуска'} value={item.edition} />
      <span className={cn('price')}>Цена: {numberFormat(item.price)} ₽</span>
      <button className={cn('cart-action')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ProductDetails.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    price: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
}

ProductDetails.defaultArgs = {
  onAdd: () => {}
}

export default memo(ProductDetails);