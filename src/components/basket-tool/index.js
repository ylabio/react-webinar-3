import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function BasketTool({sum, amount, onOpen, t, tt}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{tt('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${tt('basket.articles', undefined, amount)} / ${numberFormat(sum)} ₽`
          : tt('basket.empty')
        }
      </span>
      <button onClick={onOpen}>{tt('basket.open')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func,
  tt: PropTypes.func,
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0,
  t: (text) => text,
  tt: () => {}
}

export default memo(BasketTool);
