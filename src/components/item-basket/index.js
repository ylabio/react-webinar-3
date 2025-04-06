import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';

function ItemBasket({
  item,
  onRemove = () => {},
  linkTo = `/articles/${item._id}`,
  onLinkClick = () => {},
}) {
  const cn = bem('ItemBasket');
  const { t } = useTranslate();

  const callbacks = {
    onRemove: () => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <h4 className={cn('title')}>
        <Link to={linkTo} onClick={onLinkClick}>
          {item.title}
        </Link>
      </h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {t('pcs')}
        </div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={t('remove')} />
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
  onRemove: PropTypes.func,
  linkTo: PropTypes.string,
  onLinkClick: PropTypes.func,
};

export default memo(ItemBasket);
