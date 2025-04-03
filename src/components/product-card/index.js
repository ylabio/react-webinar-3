import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button';

import { numberFormat } from '../../utils';

import './style.css';

function ProductCard(props) {
  const cn = bem('ProductCard');

  const callbacks = {
    onAddToBasket: e => props.onAddToBasket(props.item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item.description}</div>
      <ul className={cn('list')}>
        <li className={cn('country')}>
          Страна производитель:
          <span>
            {props.item.madeIn.title} ({props.item.madeIn.code})
          </span>
        </li>
        <li className={cn('category')}>
          Категория: <span>{props.item.category.title}</span>
        </li>
        <li className={cn('edition')}>
          Год выпуска: <span>{props.item.edition}</span>
        </li>
      </ul>
      <div className={cn('price')}>Цена: <span>{numberFormat(props.item.price)}  ₽</span></div>

      <Button style="primary" onClick={callbacks.onAddToBasket} title="Добавить" />
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    category: PropTypes.shape({ title: PropTypes.string }),
    madeIn: PropTypes.shape({ title: PropTypes.string, code: PropTypes.string }),
    description: PropTypes.string,
  }).isRequired,
  onAddToBasket: PropTypes.func,
};
export default ProductCard;
