import { memo } from 'react';
import './style.css';


function ItemInfo({data, onAdd}) {


  const callbacks = {
    onAdd: (e) => onAdd(data._id),
    }

  return (
    <div className='ItemInfo-container'>
    <div>{data.description}</div>
    <div>Страна производитель: <strong>{' '+ data.madeIn.title + ' ('+data.madeIn.code+')'}</strong></div>
    <div>Категория:<strong>{' '+ data.category.title}</strong></div>
    <div>Год выпуска:<strong>{' '+ data.edition}</strong></div>
    <div><strong>{'Цена: ' + data.price+' ₽'}</strong></div>
    <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}


export default memo(ItemInfo);