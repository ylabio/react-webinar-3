import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import {useDictionary} from "../../app/translations/useDictionary";
import {Link} from "react-router";

function ItemBasket({ item, onRemove = () => {}, link }) {
  const cn = bem('ItemBasket');
  const { t } = useDictionary();
  const callbacks = {
    onRemove: (e) => {
      e.stopPropagation();
      onRemove(item._id);
    }
  };

  return (
    <div className={cn()}>
      <Link to={link} className={cn('title')}>{item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={(e) => callbacks.onRemove(e)} title={t('remove')} />
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
