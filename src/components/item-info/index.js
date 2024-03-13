import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import './style.css';

function ItemInfo(props) {

  const cn = bem('Item-info');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.itemId)
  }
  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.itemInfo.description}</div>
      <div className={cn('country')}>{props.language.country}: <b>{props.itemInfo.madeIn.title} ({props.itemInfo.madeIn.code})</b></div>
      <div className={cn('category')}>{props.language.category}: <b>{props.itemInfo.category.title}</b></div>
      <div className={cn('year')}>{props.language.edition}: <b>{props.itemInfo.edition}</b></div>
      <div className={cn('price')}>{props.language.price}: {numberFormat(props.itemInfo.price)} ₽</div>
      <button onClick={callbacks.onAdd}>{props.language.add}</button>
    </div>
  );
}

ItemInfo.propTypes = {
  onAdd: PropTypes.func
};

ItemInfo.defaultProps = {
  onAdd: () => {},
}

export default memo(ItemInfo);
