import { memo, useCallback, useContext } from 'react';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../button';
import { LanguageContext } from '../language-provider';
import './style.css';

function ItemBasket({ item, onRemove = () => {}, onClose = () => {}} ) {
  const cn = bem('ItemBasket');

  const { language, translations } = useContext(LanguageContext);

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <Link to={`/articles/${item._id}`} onClick={onClose}>        
        <h4 className={cn('title')}>{item.title}</h4>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {translations[language].quantity}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button
           style="delete"
           onClick={callbacks.onRemove} title={translations[language].deleteButton} 
          />
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
  onClose: PropTypes.func
};

export default memo(ItemBasket);

