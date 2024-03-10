import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import './style.css';

function ItemInfo(props) {

  const cn = bem('Item-info');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.itemId)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.itemInfo.description}</div>
      <div className={cn('country')}>Страна производитель: <b>{props.itemInfo.madeIn.title} ({props.itemInfo.madeIn.code})</b></div>
      <div className={cn('category')}>Категория: <b>{props.itemInfo.category.title}</b></div>
      <div className={cn('year')}>Год выпуска: <b>{props.itemInfo.edition}</b></div>
      <div className={cn('price')}>Цена: {numberFormat(props.itemInfo.price)} ₽</div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ItemInfo.propTypes = {
  onAdd: PropTypes.func
};

ItemInfo.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemInfo);
