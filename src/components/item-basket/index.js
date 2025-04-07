import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/language-context';
import { translations } from '../../locales';

function ItemBasket({ item, onRemove, closeModal }) {
  const cn = bem('ItemBasket');
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const handleRemove = e => {
    e.stopPropagation();
    onRemove(item._id);
  };

  return (
    <div className={cn()}>
      {' '}
      {/* Добавляем обработчик клика */}
      <Link to={`/product/${item._id}`} className={cn('title')} onClick={closeModal}>
        {item.title}
      </Link>
      <div className={cn('right')} onClick={e => e.stopPropagation()}>
        <div className={cn('cell')}>
          {numberFormat(item.amount)} {t.pieces}
        </div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button onClick={handleRemove} style="delete" title={t.deleteToCart} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default memo(ItemBasket);
