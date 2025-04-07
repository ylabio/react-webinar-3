import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import { langKeyWords } from '../../utils/lang';

function Item({ item, lang = 'ru', onAdd = () => {}, onNavigate = () => {}}) {
  const cn = bem('Item');
  
  const callbacks = {
    onAdd: e => onAdd(item._id),
    onNavigate: e => onNavigate(item._id),
  };

  const multi = langKeyWords[lang] || langKeyWords.ru;

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')} onClick={callbacks.onNavigate}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price, lang)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title={multi.btnAdd} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  lang: PropTypes.string,
  onAdd: PropTypes.func,
  onNavigate: PropTypes.func,
};

export default memo(Item);
