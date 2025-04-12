import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import Button from '../button';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Item({ item, link, onAdd = () => {}, labelCurr = '₽', labelAdd = 'Добавить' }) {
  const cn = bem('Item');
  const { t } = useTranslate();

  const { lang } = useSelector(state => ({
    lang: state.locale.lang,
  }));

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  // Выбор названия по текущему языку с переводом, если нужно
  let title = '—';

  if (typeof item.title === 'object' && item.title !== null) {
    title = item.title[lang] || item.title.en || Object.values(item.title)[0] || '—';
  } else if (typeof item.title === 'string') {
    const rawTitle = item.title;
    const match = rawTitle.match(/^Article №(\d+)$/);
    if (match) {
      const number = match[1];
      title = `${t('product.Article')} №${number}`;
    } else {
      const translated = t(`product.${rawTitle}`);
      title = translated !== `product.${rawTitle}` ? translated : rawTitle;
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={link}>{title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(item.price)} {labelCurr}
        </div>
        <Button style="primary" onClick={callbacks.onAdd} title={labelAdd} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        ru: PropTypes.string,
        en: PropTypes.string,
      }),
    ]),
    price: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
};

export default memo(Item);
