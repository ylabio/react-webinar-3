import {memo} from "react";
import './style.css';
import {numberFormat} from "../../utils";

function CatalogItemInfo({item, onAdd}) {

  const callbacks = {
    onAdd: (e) => onAdd(item?._id)
  }

  return (
    <div className='item-info-wrapper'>
      <p className='item-info-caption'>{item?.description}</p>
      <p className='item-info-caption'>Страна-производитель: <span className='item-info-value'>{item?.madeIn?.title}</span></p>
      <p className='item-info-caption'>Категория: <span className='item-info-value'>{item?.['category']?.title}</span></p>
      <p className='item-info-caption'>Год выпуска: <span className='item-info-value'>{item?.edition}</span></p>
      <p className='item-info-price'>Цена: <span>{`${numberFormat(item?.price)}  ₽`}</span></p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

export default memo(CatalogItemInfo);