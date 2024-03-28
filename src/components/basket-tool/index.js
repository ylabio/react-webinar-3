import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function BasketTool({sum, amount, onOpen, translate, punctuation}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translate('basket.inBasket')}{punctuation}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${translate('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : translate('basket.empty')
        }
      </span>
      <button className={cn('btn')} onClick={onOpen}>{translate('basket.open')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0,
  translate: (text) => text,
  punctuation: ':',
}

export default memo(BasketTool);
