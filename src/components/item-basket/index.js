import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { Link } from 'react-router';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { messages } from '../../messages';

function ItemBasket(props) {
  const store = useStore();
  const select = useSelector(state => ({
        lang: state.inter.lang,
      }));
  
  const cn = bem('ItemBasket');
  const buttonMessage = messages[select.lang].deleteButton; 
  const pcsMessage = messages[select.lang].pieces; 
    

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <Link onClick={callbacks.closeModal} to={`/${props.item._id}`}><h4 className={cn('title')}>{props.item.title}</h4></Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {pcsMessage}</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={buttonMessage} />
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

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
