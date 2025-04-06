import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function AboutItem(props) {
  const cn = bem('AboutItem');
  const callbacks = {
    onAdd: e => props.onAdd(props.item?._id),
  };
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item?.description}</div>
      <div className={cn('madeIn')}>
        <div className={cn('madeIn-left')}>
          <div className={cn('madeIn-left-titlecode')}>
            Страна производитель:
          </div>
          <div className={cn('madeIn-left-category')}>Категория:</div>
          <div className={cn('madeIn-left-edition')}>Год выпуска:</div>
        </div>
        <div className={cn('madeIn-right')}>
          <div className={cn('madeIn-right-titlecode')}>
            {props.item.madeIn?.title} {`(${props.item.madeIn?.code})`}
          </div>
          <div className={cn('madeIn-right-category')}>{props.item.category?.title} </div>
          <div className={cn('madeIn-right-edition')}>{props.item?.edition} </div>
        </div>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(props.item?.price)} ₽</div>
      <div className={cn('actions')}>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </div>
  );
}
export default memo(AboutItem);
