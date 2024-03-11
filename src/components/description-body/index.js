import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function DescriptionBody({item}){
  const cn = bem('DescriptionBody');
  return(
    <div className={cn()}>
      <p>{item.description}</p>
      <p>Страна производитель: <b>{item.country?.title} ({item.country?.code})</b></p>
      <p>Категория: <b>{item.category?.title}</b></p>
      <p>Год выпуска: <b>{item.edition}</b></p>
      <p className={cn('price')}><b>Стоимость: {numberFormat(item.price)} ₽</b></p>
    </div>
  );

}

export default memo(DescriptionBody);