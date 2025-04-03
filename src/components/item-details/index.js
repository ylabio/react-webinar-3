import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import useSelector from '../../store/use-selector';
import { numberFormat } from '../../utils';
import { translations } from '../../utils/translations';
import Button from '../button';
import './style.css';

function ItemDetails({ item, onAdd = () => {} }) {
  const cn = bem('ItemDetails');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  const lang = useSelector(state => state.language.currentLanguage);
  const t = translations[lang] || translations.ru;

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.description}</div>
      <div className={cn('wrapper')}>
        <div className={cn('info')}>
          {t.madeIn}:
          <b>
            {item.madeIn.title} ({item.madeIn.code})
          </b>
        </div>
        <div className={cn('info')}>
          {t.category}:<b>{item.category.title}</b>
        </div>
        <div className={cn('info')}>
          {t.edition}: <b>{item.edition}</b>
        </div>
      </div>
      <div className={cn('price')}>
        {t.price}: {numberFormat(item.price)} ₽
      </div>
      <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
    </div>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(ItemDetails);
