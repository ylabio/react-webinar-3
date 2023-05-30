import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, translate }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{translate('title')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, translate('plural'))} / ${numberFormat(sum)} ₽`
            : translate('empty')
          }
        </span>
        <button onClick={onOpen}>{translate('follow')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  translate: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
