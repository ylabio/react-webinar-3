import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function BasketTool({sum, amount, onOpen, t}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t.translate('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${t.translate('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t.translate('basket.empty')
        }
      </span>
      <button onClick={onOpen}>{t.translate('basket.open')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0,
}

export default memo(BasketTool);
