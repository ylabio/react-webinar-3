import {memo, useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import useStore from '../../store/use-store';
import useSelector from "../../store/use-selector";
import { lang } from '../../data/lang';
import { plural } from '../../utils';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const store = useStore();

  const select = useSelector(state => ({
    lang: state.lang.lang
  }));

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModalBasket: useCallback(() => store.actions.modals.close('basket'), [store]),
  };

  const variants = {
    one: lang[select.lang].pc.one,
    few: lang[select.lang].pc.few,
    many: lang[select.lang].pc.few,
  }

  return (
    <div className={cn()}>
      <Link to={`/items/${props.item._id}`} onClick={callbacks.closeModalBasket} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {plural(props.item.amount || 0, variants)}</div> 
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{lang[select.lang].remove}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
