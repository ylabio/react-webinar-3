import {memo, useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import 'style.css'
import PropTypes from "prop-types";

function ProductInfo({product, onAdd, productId}) {

  const cn = bem('ItemInfo');

  const callbacks = {
    onAdd:  useCallback(() => onAdd(productId), [product, onAdd])
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {product.description}
      </div>
      <div className={cn('extra')}>
        <p>
          Страна производитель: <span>
          {product.madeIn?.title}
        </span>
        </p>
      </div>
      <div className={cn('extra')}>
        <p>
          Категория: <span>
            {product.category?.title}
          </span>
        </p>
      </div>
      <div className={cn('extra')}>
        <p>
          Год выпуска: <span>
            {product.edition}
          </span>
        </p>
      </div>
      <div className={cn('price')}>
        <p>
          Цена: <span>
          {product.price}
        </span>
        </p>
      </div>
      <button onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>)
}

export default memo(ProductInfo)
