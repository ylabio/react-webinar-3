import { memo, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../locales';
import './style.css';

function ItemBasket(props, onRemove = () => {}) {
  const cn = bem('ItemBasket');
  const { language } = useContext(LanguageContext);
  const href = props.item.href ? props.item.href : `/products/${props.item._id}`;

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      <Link to={href} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={translations[language].delete} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
