import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import {useTranslate} from '../../hooks/useTranslate'
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const tr = useTranslate()
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{tr('InCart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: tr('OneProduct'),
            few: tr('FewProducts'),
            many: tr('ManyProducts')
          })} / ${numberFormat(sum)} ₽`
          : tr('Empty')
        }
      </span>
      <button onClick={onOpen}>{tr('Open')}</button>
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
