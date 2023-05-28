import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import './style.css';

function ItemPageComponent({item, addToBasket}) {
  const cn = bem('PageItem');

  const callbacks = {
    onAdd: (e) => addToBasket(item?._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item?.description}</div>
      <div className={cn('dealer')}>
        Страна производитель:&nbsp;
        <span className="bold">
          {item.madeIn?.title} {item.madeIn?.code}
        </span>
      </div>
      <div className={cn('category')}>
        Категория:&nbsp;
        <span className="bold">{item.category?.title}</span>
      </div>
      <div className={cn('edition')}>
        Год выпуска:&nbsp;
        <span className="bold">{item?.edition}</span>
      </div>
      <div className={cn('price')}>
        <span className="bold big">Цена:&nbsp;{item?.price}</span>
      </div>
      <button className={cn('add')} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}

ItemPageComponent.propTypes = {
  item: PropTypes.object,
  onAdd: PropTypes.func,
};

ItemPageComponent.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemPageComponent);
