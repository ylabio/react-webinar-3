import { cn as bem } from '@bem-react/classname';
import { priceFormatter } from '../../utils';
import './style.css';
import PropTypes from 'prop-types';
import useTranslation from '../../hooks/use-translation';

function ItemInfo({ onAddToCart, item }) {
  const { t } = useTranslation();
  const cn = bem('ItemInfo');
  if (!item) return null;

  return (
    <section className="ItemInfo">
      <p className={cn('paragraph')}>{item.description}</p>
      <p className={cn('paragraph')}>
        {t('made in')}: <b>{`${item.country.title} (${item.country.code})`}</b>
      </p>
      <p className={cn('paragraph')}>
        {t('category')}: <b>{item.category}</b>
      </p>
      <p className={cn('paragraph')}>
        {t('edition')}: <b>{item.edition}</b>
      </p>
      <p className={cn('paragraph', { type: 'price' })}>
        {t('price')}: {priceFormatter(item.price)}
      </p>
      <button type={'button'} onClick={() => onAddToCart(item._id)}>
        {t('add button')}
      </button>
    </section>
  );
}

ItemInfo.propTypes = {
  onAddToCart: PropTypes.func,
  item: PropTypes.object,
};

ItemInfo.defaultProps = {
  onAddToCart: () => {},
};

export default ItemInfo;
