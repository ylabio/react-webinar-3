import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => {
      e.stopPropagation(); // Останавливаем всплытие события
      props.onAdd(props.item._id);
    },
    onClick: () => {
      if (props.onClick) {
        props.onClick(props.item._id); // Вызываем обработчик клика по товару
      }
    }
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <h4 className={cn('title')}>{props.item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onClick: PropTypes.func, // Добавляем propTypes для обработчика клика
};

Item.defaultProps = {
  onAdd: () => {},
  onClick: () => {}, // Добавляем defaultProps для обработчика клика
};

export default memo(Item);
