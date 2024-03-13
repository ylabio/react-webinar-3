import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, t }) {
  
  const cn = bem('BasketTool');  

  return (
    <div className={cn()}>
        <span className={cn('label')}>{t('inBasket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: t('oneProduct'),
              few: t('twoProducts'),
              many: t('aLotOfProducts')
            })} / ${numberFormat(sum)} ₽`
            : `${t('empty')}`
          }
        </span>
        <button onClick={onOpen}>{t('proceed')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
