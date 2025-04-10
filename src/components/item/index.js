import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import Button from '../button';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const { t } = useTranslate();

  const { lang } = useSelector(state => ({
    lang: state.locale.lang,
  }));

  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  // Выбор названия по текущему языку с переводом, если нужно
  let title = '—';

  if (typeof props.item.title === 'object' && props.item.title !== null) {
    title =
      props.item.title[lang] || props.item.title.en || Object.values(props.item.title)[0] || '—';
  } else if (typeof props.item.title === 'string') {
    const rawTitle = props.item.title;

    const match = rawTitle.match(/^Article №(\d+)$/);
    if (match) {
      // Строка вида "Article №15" → "Товар №15"
      const number = match[1];
      title = `${t('product.Article')} №${number}`;
    } else {
      const translated = t(`product.${rawTitle}`);
      title = translated !== `product.${rawTitle}` ? translated : rawTitle;
    }
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={props.link}>{title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} {props.labelCurr}
        </div>
        <Button style="primary" onClick={callbacks.onAdd} title={props.labelAdd} />
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

Item.defaultProps = {
  onAdd: () => {},
  labelCurr: '₽',
  labelAdd: 'Добавить',
};

export default memo(Item);
