import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => {
      e.preventDefault(); // Предотвращаем переход при клике на кнопку
      props.onAdd(props.item._id);
    },
  };

  return (
    <div className={cn()}>
      <Link to={`/product/${props.item._id}`} className={cn('link')}>
        <h4 className={cn('title')}>{props.item.title}</h4>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <Button
          style="primary"
          onClick={callbacks.onAdd}
          title="Добавить"
          // Добавляем класс для кнопки, чтобы можно было стилизовать
          className={cn('add-button')}
        />
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
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
