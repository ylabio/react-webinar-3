import {memo} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
function ProductInfo({item, onAdd}) {
  const cn = bem('ProductInfo');
  const callbacks = {
    onAdd: () => onAdd(item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{ item.description }</div>
      <div className={cn('manufacturer')}>Страна производитель: <p className={cn('bold')}>{item.madeIn.title} ({item.madeIn.code})</p></div>
      <div className={cn('category')}>Категория: <p className={cn('bold')}>{ item.category.title }</p></div>
      <div className={cn('year')}>Год выпуска: <p className={cn('bold')}>{ item.edition }</p></div>
      <div className={cn('price')}>Цена { item.price }</div>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </div>

  );
}

export default memo(ProductInfo);
