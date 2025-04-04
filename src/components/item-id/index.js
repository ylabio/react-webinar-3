import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button';
import './style.css';
import { numberFormat } from '../../utils';

function ItemId(props) {
  const cn = bem('ItemId');

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {props.item.description}
        </div>
        <div className={cn('info')}>
        <div className={cn('left')}>
      <p>Страна производитель:</p>
      <p>Категория:</p>
      <p>Год выпуска:</p>
      </div>
      <div className={cn('right')}>
       <p>{props.item.madeTitle}</p>
        <p>{props.item.categoryTitle}</p>
        <p>{props.item.edition}</p>
        </div>
        </div>
      <div className={cn('actions')}>
        {/* <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div> */}
        <div className={cn('price')}>
          <p>Цена : {numberFormat(props.item.price)} ₽</p>
          </div>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </div>
  );
}

ItemId.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};



export default memo(ItemId);
