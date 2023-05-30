import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {useEffect} from "react";
function ItemDetail({onChangeHeadTitle, translation, item, onAdd}) {
  const cn = bem('ItemDetail');

  useEffect(() => {
    onChangeHeadTitle(item.title);
  } ,[]);

  const callbacks = {
    onAdd: () => onAdd(item._id)
  }

  return (
    <div className={cn()}>
      <p>{item.description}</p>
      <p>{translation.madeIn}: <span className={cn('bold')}>{item.madeIn?.title} ({item.madeIn?.code})</span></p>
      <p>{translation.category}: <span className={cn('bold')}>{item.category?.title}</span></p>
      <p>{translation.releaseAt}: <span className={cn('bold')}>{item.edition}</span></p>
      <p className={cn('price')}>{translation.price}: {numberFormat(item.price, translation.pluralKey)} ₽</p>
      <button onClick={callbacks.onAdd}>{translation.add}</button>
    </div>
  );
}

export default ItemDetail;
