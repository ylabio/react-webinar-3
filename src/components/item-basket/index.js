import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { Link } from 'react-router';
import useStore from '../../store/use-store';

function ItemBasket(props, buttonMessage, pcsMessage) {
  const store = useStore();

  
  const cn = bem('ItemBasket');
    

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <Link onClick={callbacks.closeModal} to={`/articles/${props.item._id}`}><h4 className={cn('title')}>{props.item.title}</h4></Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.pcsMessage}</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={props.buttonMessage} />
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
  buttonMessage: propTypes.string,
  pcsMessage: propTypes.string
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
