import { memo, useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

function ItemBasket(props) {
  const navigate = useNavigate();
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(
      e => {
        e.preventDefault();
        props.onRemove(props.item._id);
      },
      [props],
    ),
    onNavigationToProduct: useCallback(
      e => {
        e.preventDefault();
        props.onCloseModal();
        navigate(ROUTES.PRODUCT(props.item._id));
      },
      [props],
    ),
  };

  return (
    <Link onClick={callbacks.onNavigationToProduct}>
      <div className={cn()}>
        {/* <div className={cn('code')}>{props.item._id}</div> */}
        <h4 className={cn('title')}>{props.item.title}</h4>
        <div className={cn('right')}>
          <div className={cn('cell')}>
            {numberFormat(props.item.amount || 0, undefined, {})} {props.units}
          </div>
          <div className={cn('cell')}>{numberFormat(props.item.price, props.language)}</div>
          <div className={cn('cell')}>
            <Button style="delete" onClick={callbacks.onRemove} title={props.title} />
          </div>
        </div>
      </div>
    </Link>
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
  onCloseModal: propTypes.func,
  units: propTypes.string,
  language: propTypes.string,
  title: propTypes.string,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
