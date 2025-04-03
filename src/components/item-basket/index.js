import { cn as bem } from '@bem-react/classname';
import { default as propTypes, default as PropTypes } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router';
import useSelector from '../../store/use-selector';
import { numberFormat } from '../../utils';
import { translations } from '../../utils/translations';
import Button from '../button';
import './style.css';

function ItemBasket({ item, onRemove = () => {} }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  const lang = useSelector(state => state.language.currentLanguage);
  const t = translations[lang] || translations.ru;

  return (
    <div className={cn()}>
      <Link to={`${item._id}`} className={cn('link')}>
        <h4 className={cn('title')}>{item.title}</h4>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {t.amount}
        </div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title="Удалить" />
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
