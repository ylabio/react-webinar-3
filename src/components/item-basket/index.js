import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { langKeyWords } from '../../utils/lang';

function ItemBasket({ item, lang = 'ru', onRemove = () => {},
onNavigate = () => {} }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
    onNavigate: e => onNavigate(item._id),
  };

  const multi = langKeyWords[lang] || langKeyWords.ru;

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')} onClick={callbacks.onNavigate}>{item.title}</h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {multi.amount}</div>
        <div className={cn('cell')}>{numberFormat(item.price, lang)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={multi.btnDelete} />
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
  lang: PropTypes.string,
  onRemove: propTypes.func,
  onNavigate: propTypes.func,
};

export default memo(ItemBasket);
