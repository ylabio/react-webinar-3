import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import useTranslate from '../../hooks/useTranslate';
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const _ = useTranslate();
  const cn = bem('BasketTool');
  const plurals = _('pluralGoods');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{_('basketIn')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:plurals[0], few:plurals[1], many:plurals[2]})} / ${numberFormat(sum)} ₽`
          : _('empty')
        }
      </span>
      <button onClick={onOpen}>{_('toBasketAction')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
