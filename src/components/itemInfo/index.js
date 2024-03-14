import { memo } from 'react';
import './style.css';
import { useLanguage } from '../../languageContext';


function ItemInfo({data, onAdd}) {

  const {tr} = useLanguage(); 
  const callbacks = {
    onAdd: (e) => onAdd(data._id),
    }

  return (
    <div className='ItemInfo-container'>
    <div>{data.description}</div>
    <div>{tr('manufacture')} <strong>{' '+ data.madeIn.title + ' ('+data.madeIn.code+')'}</strong></div>
    <div>{tr('category')}<strong>{' '+ data.category.title}</strong></div>
    <div>{tr('edition')}<strong>{' '+ data.edition}</strong></div>
    <div><strong>{tr('price') + data.price+' ₽'}</strong></div>
    <button onClick={callbacks.onAdd}>{tr('addBtn')}</button>
    </div>
  )
}


export default memo(ItemInfo);