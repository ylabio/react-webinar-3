import './style.css'
import React from "react";

const ProductInfo = ({itemInfo, onAdd}) => {
  return (
    <div>
      <div className={'productInfo'}>
        <div className={'description'}>
          {itemInfo.description}
        </div>
        <div className={'madeIn'}>
          Страна производитель: <span>{itemInfo.madeIn._type}</span>
        </div>
        <div className={'category'}>
          Категория: <span>{itemInfo.category._type}</span>
        </div>
        <div className={'edition'}>
          Год выпуска: <span>{itemInfo.edition}</span>
        </div>
        <div className={'price'}>
          Цена: {itemInfo.price}
        </div>
        <button className={'addButton'}
                onClick={() => onAdd(itemInfo._id)}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}

export default React.memo(ProductInfo)